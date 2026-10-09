"""Build Patina's photographer brief and maker invitation with local brand assets.

Run with Python plus reportlab, fonttools and pypdf. No remote assets required.
"""
from pathlib import Path
import csv
import html
import json
import re
import shutil

from fontTools.ttLib import TTFont as FTFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
REPO_CANDIDATE = HERE.parents[2]
IN_REPO = (REPO_CANDIDATE / 'public/fonts/manrope.ttf').is_file()
ROOT = REPO_CANDIDATE if IN_REPO else HERE
OUT = ROOT / 'output/pdf' if IN_REPO else HERE / 'PDFs'
ASSETS = HERE / 'assets'
TMP = ROOT / 'tmp/pdfs/patina-photo-maker'
for directory in (OUT, ASSETS, TMP):
    directory.mkdir(parents=True, exist_ok=True)

for name in ('libre-caslon-display.ttf', 'manrope.ttf', 'Libre-Caslon-Display-OFL.txt', 'Manrope-OFL.txt'):
    if IN_REPO:
        shutil.copy2(ROOT / 'public/fonts' / name, ASSETS / name)
    assert (ASSETS / name).is_file(), f'Missing bundled font: {name}'
for src, dest in [('studio/room.jpg', 'room-reference.jpg'), ('founders/hiawatha-room.jpg', 'hiawatha-room.jpg')]:
    if IN_REPO:
        shutil.copy2(ROOT / 'public/images' / src, ASSETS / dest)
    assert (ASSETS / dest).is_file(), f'Missing bundled reference: {dest}'

pdfmetrics.registerFont(TTFont('Caslon', str(ASSETS / 'libre-caslon-display.ttf')))
for name, weight in [('Manrope', 400), ('ManropeBold', 650)]:
    font = FTFont(ASSETS / 'manrope.ttf')
    if 'fvar' in font:
        font = instantiateVariableFont(font, {'wght': weight}, inplace=True)
    font.save(TMP / f'{name}.ttf')
    pdfmetrics.registerFont(TTFont(name, str(TMP / f'{name}.ttf')))
pdfmetrics.registerFontFamily('Manrope', normal='Manrope', bold='ManropeBold', italic='Manrope', boldItalic='ManropeBold')

W, H = 612, 792
INK, MOCHA, CLAY, PAPER, CREAM = '#3F3B37', '#655B52', '#A3927C', '#FAF7F2', '#EDE9E4'
APPLY = 'https://patina.cloud/makers/apply'
DATE = '12 September 2026'

class Book:
    def __init__(self, filename, title, audience):
        self.filename, self.document_title, self.audience = filename, title, audience
        self.c = canvas.Canvas(str(OUT / filename), pagesize=(W, H), pageCompression=1)
        self.c.setTitle(title)
        self.c.setAuthor('Patina | Kody & Leah Kochaver')
        self.c.setSubject(audience)
        self.n, self.source, self.boxes = 0, [f'# {title}', f'\n{DATE}\n'], []

    def page(self, label, dark=False):
        if self.n:
            self.c.showPage()
        self.n += 1
        self.dark = dark
        self.bg, self.fg = (INK, PAPER) if dark else (PAPER, INK)
        self.c.setFillColor(HexColor(self.bg))
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        self.source.append(f'\n## {self.n:02d} / {label}\n')
        self.text(40, 25, 160, 'Patina', 29, 30, 'Caslon', record=False)
        self.strata(531, 34)
        self.text(40, 61, 530, label.upper(), 8, 11, 'ManropeBold', record=False)
        self.rule(40, 746, 532)
        self.text(40, 757, 390, f'{self.audience}  /  September 2026', 8, 11, record=False, footer=True)
        self.text(542, 757, 30, f'{self.n:02d}', 8, 11, record=False, footer=True)

    def strata(self, x, top):
        # Exact compact Strata geometry from the website component.
        c = self.c
        colors = [CREAM, CREAM, CREAM] if self.dark else [MOCHA, CLAY, CLAY]
        alphas = [1, .7, .4] if self.dark else [1, 1, .5]
        for width, height, dy, color, alpha in [(40,2,0,colors[0],alphas[0]),(32,1.7,5,colors[1],alphas[1]),(24,1.4,9.7,colors[2],alphas[2])]:
            c.saveState(); c.setFillAlpha(alpha); c.setFillColor(HexColor(color))
            c.roundRect(x, H-top-dy-height, width, height, height/2, fill=1, stroke=0); c.restoreState()

    def text(self, x, top, width, value, size=11, leading=None, font='Manrope', color=None, record=True, footer=False):
        style = ParagraphStyle('p', fontName=font, fontSize=size, leading=leading or size*1.45,
                               textColor=HexColor(color or self.fg), spaceAfter=0, allowWidows=0, allowOrphans=0)
        p = Paragraph(value, style)
        _, height = p.wrap(width, 1000)
        if top + height > (781 if footer else 737):
            raise ValueError(f'{self.filename} p{self.n}: text overflows at {top+height}: {value[:90]}')
        p.drawOn(self.c, x, H-top-height)
        self.boxes.append(dict(page=self.n, x=x, y=top, w=width, h=height, text=re.sub('<[^>]+>', '', value)))
        if record:
            self.source.append(html.unescape(re.sub('<[^>]+>', '', value.replace('<br/>', '\n'))) + '\n')
        return top+height

    def title(self, value, top=101, width=532, size=42):
        return self.text(40, top, width, value, size, size*1.02, 'Caslon')

    def rule(self, x, top, width):
        self.c.setStrokeColor(HexColor(CLAY)); self.c.setLineWidth(.45)
        self.c.line(x, H-top, x+width, H-top)

    def image(self, name, x, top, width, height):
        img = ImageReader(str(ASSETS / name))
        iw, ih = img.getSize()
        factor = max(width/iw, height/ih)
        self.c.saveState()
        path=self.c.beginPath(); path.rect(x, H-top-height, width, height)
        self.c.clipPath(path, stroke=0)
        self.c.drawImage(img, x+(width-iw*factor)/2, H-top-height+(height-ih*factor)/2,
                         width=iw*factor, height=ih*factor, mask='auto')
        self.c.restoreState()

    def button(self, x, top, label='Apply to Partner', url=APPLY, width=195):
        self.c.setFillColor(HexColor(PAPER if self.dark else INK))
        self.c.rect(x, H-top-39, width, 39, fill=1, stroke=0)
        self.text(x+15, top+11, width-26, label, 11, 15, 'ManropeBold', INK if self.dark else PAPER)
        self.c.linkURL(url, (x,H-top-39,x+width,H-top), relative=0)
        self.source.append(url+'\n')

    def qr(self, x, top, size=88):
        widget=QrCodeWidget(APPLY, barLevel='M')
        x0,y0,x1,y1=widget.getBounds()
        drawing=Drawing(size,size,transform=[size/(x1-x0),0,0,size/(y1-y0),0,0])
        drawing.add(widget)
        self.c.setFillColor(HexColor('#FFFFFF')); self.c.rect(x,H-top-size,size,size,fill=1,stroke=0)
        renderPDF.draw(drawing,self.c,x,H-top-size)
        self.c.linkURL(APPLY, (x,H-top-size,x+size,H-top), relative=0)

    def finish(self, slug):
        self.c.save()
        (HERE / f'{slug}.md').write_text('\n'.join(self.source))
        (TMP / f'{slug}-layout.json').write_text(json.dumps(self.boxes, indent=2))
        reader=PdfReader(OUT/self.filename)
        assert len(reader.pages)==self.n
        assert all(len(page.extract_text())>200 for page in reader.pages)
        return {'file':self.filename,'pages':self.n,'bytes':(OUT/self.filename).stat().st_size,
                'links':sum(len(p.get('/Annots', [])) for p in reader.pages)}


SHOTS = [
    ('S01','P1','A room that feels lived in','Home / studio','Place the selected piece on the right; leave the left third quiet for the headline. Keep verticals straight and the room believable.','16:9 landscape; uncropped master','Homepage opening; press; campaign lead','Natural light; actual furniture and personal objects.'),
    ('S02','P1','The room, in portrait','Home / studio','Recompose from camera for a tall frame. Keep the entire hero piece readable; leave breathing room above and below.','4:5 and separate 9:16','Mobile hero; social; story covers','Same room and piece as S01; do not rely on a tight crop.'),
    ('S03','P1','The same piece, considered','Home / studio','Photograph the S01 piece at the same three-quarter angle and camera height. Show the full silhouette and every foot, with separation from the background.','Landscape plus portrait; cutout source','Room-to-study transition','Mark camera and piece positions; keep lens and light consistent.'),
    ('S04','P1','A detail with something to say','Home / studio','Choose a joint, edge, seam or material meeting on the S01 piece. Make the construction legible; capture a wider companion for context.','Close landscape and 4:5','Piece study; maker editorial','Record the actual material, finish and maker, when confirmed.'),
    ('S05','P1','A real material conversation','Home / studio','Photograph samples Leah is actually considering: one overhead still arrangement, one frame with a hand making a choice.','Landscape, square-safe and 4:5','Our Story; material study; founder letters','Real timber/textile/finish samples, working sketch and pencil.'),
    ('S06','P1','The transition plates','Home / studio','Before moving the camera, capture the S01 setup with and without the piece. Include a neutral, uncluttered background frame for the study.','Full-resolution landscape masters','Motion compositing; responsive crops','Tripod; fixed exposure and white balance; preserve natural shadow.'),
    ('S07','P1','The workshop in context','Maker workshop','Show where real work happens. Include the maker, bench and a readable piece or component. Let the maker continue their normal process.','Landscape and 4:5','Making scene; maker page; editorial','Identify workshop, person, piece and process. This can be a separate story.'),
    ('S08','P1','Hands doing the work','Maker workshop','Capture one real operation: fitting a joint, shaping an edge or applying finish. Shoot a close view and a wider frame showing the action.','Landscape, 4:5 and vertical option','Homepage making; maker invitation; social','Choose the operation with the maker; preserve their normal safe setup.'),
    ('S09','P2','A finish or material decision','Maker workshop','Show the actual test, offcut or finish comparison beside the piece. Make the difference visible through light and angle.','Close landscape and square-safe','Journal; process notes; maker stories','Ask what is being compared and why; keep the explanation verbatim in notes.'),
    ('S10','P2','Leah, in the process','Home / studio','Over the shoulder or hands selecting materials; include one wider frame of a real design conversation. Keep attention on her judgment.','Landscape and 4:5','Our Story; designer outreach','A project or material decision Leah can discuss; portrait optional.'),
    ('S11','P2','Kody, building Patina','Home / studio','Hands sketching a flow or an over-the-shoulder view of the actual prototype. Let a real working gesture carry the frame.','Landscape and 4:5','Our Story; building updates','Use a cleared demo screen; exclude private client details and credentials.'),
    ('S12','P2','Kody and Leah, together','Home / studio','Photograph an unforced conversation around materials or the prototype. Capture listening and exchange before asking for eye contact.','Landscape and 4:5','Our Story; founder letters; selected press','A real table, their own notes and materials. Keep the room present.'),
    ('S13','P2','The maker at their bench','Maker workshop','Start with a working portrait and, if comfortable, one direct glance to camera. Give tools and work enough context to mean something.','4:5 and landscape','Future maker profiles; editorial','Confirm the maker\'s name, role, workshop and preferred credit.'),
    ('S14','P2','Evidence of a life','Home / studio','A used chair arm, book, mended textile or personal object in its actual setting. Choose something with a short, true story.','Landscape and square-safe','Page transitions; letters; campaign details','Use objects belonging to the people and room, with context recorded.'),
    ('S15','P3','A simple founder portrait','Home / studio','One relaxed portrait together; individual frames only if time allows. Soft daylight, own clothes, no staged executive pose.','4:5, with room for square crop','Later press and founder profiles','Optional. Founder portraits are not a first-release requirement.'),
    ('S16','P2','Room to place an invitation','Home / studio','A quiet patch of room, wall, work surface or fabric with directional light. Leave a clean area for campaign copy.','16:9, 4:5 and 9:16','Founding Circle CTA; campaign backgrounds','Capture texture at a scale that stays calm behind readable type.'),
]

MOTION = [
    ('M01','Room light','8-10 seconds; locked frame; a small natural movement in the room.','S01 setup; horizontal and separate vertical take.'),
    ('M02','A material choice','8-10 seconds; one hand places or turns a real sample, then leaves the frame.','S05 setup; hold still for 2 seconds at each end.'),
    ('M03','A making gesture','8-10 seconds; one repeatable, safe action chosen by the maker.','S08 setup; record a clean beginning and end.'),
    ('M04','A working exchange','8-10 seconds; Kody and Leah look at a material or prototype together.','S12 setup; natural gestures, no scripted speaking.'),
]

def shot_row(book, row, top, height=86):
    sid, priority, name, location, direction, crop, use, prep = row
    book.rule(40, top, 532)
    book.text(40, top+12, 55, sid, 13, 16, 'ManropeBold')
    book.text(40, top+34, 55, priority, 9, 12, 'ManropeBold', MOCHA)
    book.text(110, top+9, 460, name, 21, 24, 'Caslon')
    end=book.text(110, top+36, 460, direction, 10, 13.3)
    book.text(110, end+5, 460, f'<b>{crop}</b> | {use}', 8.7, 11.5, color=MOCHA)

def photographer():
    b=Book('Patina-Photographer-Shot-List.pdf','Patina | Photographer shot list','Photographer brief')
    b.page('The Living Study / Photography direction')
    b.title('Photograph the life<br/>around the work.', 104, size=51)
    b.text(40,229,505,'Warm light. Honest materials. People absorbed in making something. A visual journey from the room to the piece, and into the process behind it.',14,20)
    b.image('room-reference.jpg',40,315,532,224)
    b.text(40,549,532,'Illustrative imagery — awaiting partner photography.',8.7,12,color=MOCHA)
    b.text(40,568,532,'Visual direction only. This scene does not establish a real product, project or maker partnership.',9,13,color=MOCHA)
    for x,num,label in [(40,'16','photographs, prioritized'),(221,'2','proposed sessions'),(402,'4','optional motion clips')]:
        b.text(x,610,150,num,41,42,'Caslon')
        b.text(x,660,162,label,9.3,13,'ManropeBold')
    b.text(40,703,532,'First priority: rooms, materials and real making. Founder portraits can follow.',10,14)
    b.text(40,724,532,'Shoot coordination: Kody Kochaver / hello@patina.cloud',8.5,11,color=MOCHA)

    b.page('01 / The room becomes a study')
    b.title('The essential first frames.',size=39)
    b.text(40,152,532,'P1 = first delivery. P2 = next layer. P3 = later, if useful. The full checklist includes setup notes and blank fields for on-set tracking.',10,14)
    for index,row in enumerate(SHOTS[:6]):
        shot_row(b,row,194+index*88)

    b.page('02 / The work and the people')
    b.title('Let the process show.',size=40)
    b.text(40,152,532,'Connect room, piece and workshop only when they share a documented story. Otherwise present the workshop as its own maker study.',10,14)
    for index,row in enumerate(SHOTS[6:12]):
        shot_row(b,row,194+index*88)

    b.page('03 / Supporting frames and motion')
    b.title('A little more of the studio.',size=38)
    for index,row in enumerate(SHOTS[12:]):
        shot_row(b,row,166+index*88)
    b.text(40,538,532,'Optional motion capture',26,28,'Caslon')
    b.text(40,575,532,'Quote separately from stills. Four short, silent clips are enough to extend the story; the website will choreograph transitions.',10.5,14)
    for index,(sid,name,action,setup) in enumerate(MOTION):
        b.text(40,614+index*25,49,sid,9,12,'ManropeBold')
        b.text(98,614+index*25,474,f'<b>{name}.</b> {action}',9,12)

    b.page('04 / A practical shoot plan')
    b.title('Build around the light.',size=42)
    b.text(40,155,532,'Proposed scope for a quote, not a booked schedule. Leah leads styling and materials; Kody handles prototype readiness and final delivery coordination.',11,15)
    b.text(40,211,532,'Session A / Home or studio / 4 hours',24,28,'Caslon')
    session_a=[('00:00-00:25','Light check, styling and marked camera positions.'),('00:25-01:35','S01-S03 + S06: room, portrait, piece and clean plates.'),('01:35-02:10','S04-S05: piece detail and material conversation.'),('02:10-03:00','S10-S12: Leah, Kody and a working conversation.'),('03:00-03:30','S14 + S16; S15 only if the essentials are complete.'),('03:30-04:00','Review, missed crops and backup. Clips only within agreed scope.')]
    for i,(time,action) in enumerate(session_a):
        y=251+i*27
        b.text(40,y,112,time,9,13,'ManropeBold');b.text(164,y,408,action,9.5,13)
    b.text(40,426,532,'Session B / Maker workshop / 90 minutes',24,28,'Caslon')
    for i,(time,action) in enumerate([('00:00-00:15','Walk the shop; identify the real operation and story.'),('00:15-01:00','S07-S08 first; then S09 + S13 if work allows.'),('01:00-01:30','Optional M03, captions, missed details and backup.')]):
        y=466+i*27;b.text(40,y,112,time,9,13,'ManropeBold');b.text(164,y,408,action,9.5,13)
    b.rule(40,558,532)
    b.text(40,576,532,'Before the photographer arrives',24,28,'Caslon')
    b.text(40,615,532,'Choose the room, hero piece and best daylight window together. Confirm access, available people and workshop timing. Collect real samples, a working sketch and object credits. Clear the prototype screen. Agree the shot priorities, usage, delivery date, retouching and whether motion or cutout work is included.',10.5,15)
    b.text(40,698,532,'Travel between locations is additional. A workshop session can follow after launch.',10,14,'ManropeBold')

    b.page('05 / Capture and delivery')
    b.title('Make every frame useful.',size=42)
    blocks=[
        ('Light & finish','Warmth should come from the light and materials. Keep whites neutral, timber believable and shadow detail present. Retouch distractions with care; retain grain, wear and signs of use. No text or brand marks baked into photographs.'),
        ('Continuity & cropping','For S01, S03 and S06, record lens, camera height, exposure and piece position. Review a rough room-to-piece alignment before moving anything. Compose landscape and portrait separately; preserve the full silhouette and generous edges.'),
        ('Stills delivery','Proposed quote target: 20-24 edited full-resolution selects covering the priority shots; final count agreed with photographer. Deliver sRGB JPEG masters, preferably 5,000+ pixels on the long edge when source capture allows. Supply 16:9, 4:5 and 9:16 crops for S01-S03/S16 where composed.'),
        ('Motion & cutout options','If commissioned: 4K clips where available, a consistent 24 or 30 fps, no titles or baked-in music, plus camera originals. For S03, include a transparent PNG cutout only if extraction is in scope; otherwise supply the clean, full-resolution source and shadow plate.'),
        ('Captions, credit & usage','For every select, record photographer, date, location, people, actual piece/maker, materials and a confirmed detail. Agree website, organic social, email and press use; specify paid use separately if planned. Record credits and any agreed restrictions alongside filenames.'),
    ]
    y=163
    for heading,body in blocks:
        b.text(40,y,145,heading,18,21,'Caslon')
        bottom=b.text(203,y,369,body,10.5,14.7)
        y=max(y+65,bottom+22)
    b.rule(40,650,532)
    b.text(40,668,532,'Delivery folder: 01_Masters / 02_Web_Crops / 03_Motion / 04_Captions',9.4,13,'ManropeBold')
    b.text(40,692,532,'Filename example: patina_S01_room-wide_01.jpg. Use the companion CSV to map files to shots, captions, credits and usage. The existing illustrative images can remain clearly labeled while real photographs arrive.',9.5,13)
    return b.finish('photographer-shot-list')

def maker_packet():
    b=Book('Patina-Maker-Pitch-Packet.pdf','Patina | An invitation to founding makers','Founding maker invitation')
    b.page('An invitation to the first 15 founding makers',dark=True)
    b.title('Good work<br/>deserves a<br/>closer look.',112,size=65)
    b.text(40,337,460,'The grain you choose. The joint you refine. The care someone will live with for years.',17,24)
    b.text(40,410,465,'We’re building a place where those decisions become part of how furniture is discovered. We’d like you to help shape it.',13,19)
    b.rule(40,483,532)
    b.text(40,513,123,'15',102,108,'Caslon')
    b.text(200,524,338,'Founding makers.<br/>A say in the beginning.',30,33,'Caslon')
    b.text(200,606,338,'A personal invitation from Kody and Leah Kochaver, Madison, Wisconsin.',10.5,15)
    b.button(40,673)
    b.text(257,678,315,'The app and marketplace are pre-launch.<br/>Where Time Adds Value.',10,15)

    b.page('01 / A note from Kody')
    b.image('hiawatha-room.jpg',40,91,532,209)
    b.text(40,310,532,'Hiawatha, a Middle West Studio project. Design: Leah Kochaver. Photography: Ashley Hicks.',8.2,11.5,color=MOCHA)
    b.text(40,326,532,'Shown as a reference to Leah’s design practice, not a Patina marketplace listing.',8.2,11.5,color=MOCHA)
    b.title('Tools should feel part of the work.',362,size=35)
    b.text(40,417,532,'I’m building Patina because the tools around furniture discovery often feel disconnected from the creative process. There is care in choosing a piece, understanding a material and imagining how it will live in a room. I want the experience to make room for that care.',11.5,17)
    b.text(40,500,532,'Leah brings the judgment of a working interior designer through her practice at Middle West Studio. I bring the product and technology work. Together, we’re building a designer-taught way to find furniture that belongs, with a path to working with a designer when someone wants to take it further.',11.5,17)
    b.text(40,586,532,'The people who make the furniture belong in that conversation from the beginning. I’d love to understand your work, and what you think a better experience should make possible.',11.5,17)
    b.text(40,653,180,'Kody',29,32,'Caslon')
    b.text(40,693,532,'Kody Kochaver / Technology & Product<br/>Leah Kochaver / Design & Experience',9.2,13,'ManropeBold')

    b.page('02 / Why take part')
    b.title('Help shape the way<br/>your work is seen.',size=45)
    benefits=[
        ('01','A designer’s point of view.','We’re building discovery around a focused selection and a working designer’s judgment. Our aim is to help homeowners and the designers they work with understand a piece: its proportion, its presence and the care in its construction.'),
        ('02','Your voice beside the work.','You know why a material was chosen, how a joint works and what a finish will become with use. Those details should come from you. We want the reasons behind a piece to be part of its introduction.'),
        ('03','A say in the beginning.','The first makers can bring practical workshop realities into the conversation while Patina is being built: how work is represented, what people need to know and where furniture discovery falls short today.'),
    ]
    for i,(num,heading,body) in enumerate(benefits):
        y=234+i*134
        b.rule(40,y-13,532);b.text(40,y,54,num,30,33,'Caslon',MOCHA)
        b.text(117,y,455,heading,27,30,'Caslon');b.text(117,y+41,455,body,11,16)
    b.text(40,663,532,'Earned placement. No sponsored slots. No pay-to-play.',13,18,'ManropeBold')
    b.text(40,693,532,'We want to understand what makes a piece worth living with.',11,15,color=MOCHA)

    b.page('03 / The first conversation')
    b.title('Start with one piece.',size=46)
    b.text(40,166,510,'Choose something that shows how you think. A finished piece, a work in progress or a portfolio link gives us somewhere useful to begin.',12,17)
    prompts=[('The form','What makes its proportions, silhouette or presence yours?'),('The material','What did you choose, where does it come from, and why does it suit this piece?'),('The construction','Which joint, edge or technique would you point out if we visited the workshop?'),('A life of use','How should someone care for it? What changes with time, and what can be repaired?'),('The practical details','Where do you work? What are your current lead times, delivery area, customization options and existing trade arrangements?')]
    for i,(heading,body) in enumerate(prompts):
        y=237+i*74
        b.rule(40,y,532)
        b.text(40,y+13,154,heading,21,24,'Caslon')
        b.text(215,y+13,357,body,11,16)
    b.text(40,636,532,'Bring what already exists.',27,30,'Caslon')
    b.text(40,679,532,'A current website, Instagram page or image gallery is a useful start. There is no image-upload requirement in the application; links and a clear description can introduce the work.',10.5,15)

    b.page('04 / How to begin')
    b.title('Tell us what you make.',size=44)
    b.text(40,159,532,'The application starts a conversation. You do not need to prepare a separate presentation.',12,17)
    b.text(40,216,247,'Have these details ready',25,28,'Caslon')
    b.text(40,258,247,'Workshop name and location.<br/>Primary specialty and years of experience.<br/>Contact name and email.<br/>A short description of your craft.',11,19)
    b.text(329,216,243,'Useful, if you have them',25,28,'Caslon')
    b.text(329,258,243,'Website or portfolio links.<br/>Existing trade arrangements.<br/>Sourcing and sustainability practices.<br/>A phone number for follow-up.',11,19)
    b.rule(40,371,532)
    steps=[('01','Send your application.','Share the essentials at patina.cloud/makers/apply.'),('02','Look for a note from Kody.','The automatic email confirms receipt. Kody reviews applications personally with Leah.'),('03','Hear from us within two weeks.','We’ll reply with a clear next step and, where there’s a fit, begin discussing what a partnership could look like.')]
    for i,(num,heading,body) in enumerate(steps):
        y=394+i*70;b.text(40,y,50,num,25,28,'Caslon',MOCHA)
        b.text(106,y,466,heading,17,21,'ManropeBold');b.text(106,y+28,466,body,10,14)
    b.qr(479,637,93)
    b.button(40,639)
    b.text(40,691,410,'<link href="https://patina.cloud/makers/apply">patina.cloud/makers/apply</link>',12,16,'ManropeBold')
    b.text(40,714,405,'Questions first? <link href="mailto:hello@patina.cloud">hello@patina.cloud</link>',10,14)

    b.page('05 / A few things to know')
    b.title('A clear beginning.',size=46)
    faqs=[
        ('Is the marketplace open?','The app and marketplace are pre-launch. We’re bringing together the people and work that will shape them. This is a founding invitation, not a promise of immediate sales.'),
        ('What does “the first 15” mean?','We’re bringing together a founding group of 15 makers whose approach to materials and construction fits Patina. Every application is reviewed personally.'),
        ('Can makers pay for placement?','No. There are no sponsored placements or pay-to-play slots. The quality of the work and its fit with Patina are the starting point.'),
        ('What are the commercial terms?','Fees, commissions, exclusivity and operating terms are not set out in this invitation. We’ll discuss the proposed scope and terms together before either side agrees to a partnership.'),
        ('Does applying mean I’ve been accepted?','No. The first email acknowledges receipt. Kody and Leah review applications personally and reply within two weeks with a next step.'),
        ('What would you need from me after that?','We would begin by understanding your work and your existing way of doing business. Any further content, product information or participation would be discussed as part of the proposed partnership.'),
    ]
    for i,(question,answer) in enumerate(faqs):
        y=172+i*76
        b.text(40,y,532,question,13,17,'ManropeBold');b.text(40,y+24,532,answer,10.5,14.5)
    b.rule(40,649,532)
    b.text(40,670,290,'Bring your work<br/>to the conversation.',30,31,'Caslon')
    b.button(355,674,width=217)
    b.text(355,721,217,'patina.cloud/makers/apply',9.5,13)
    return b.finish('maker-pitch-packet')

def checklist():
    columns=['shot_id','priority','subject','session','direction','composition','intended_use','preparation','status','selected_filename','caption_or_confirmed_detail','people_and_maker','photographer_credit','usage_and_restrictions']
    with (HERE/'photographer-shoot-checklist.csv').open('w',newline='') as f:
        writer=csv.writer(f);writer.writerow(columns)
        for row in SHOTS:writer.writerow([*row,'','','','','',''])
        for sid,name,action,setup in MOTION:writer.writerow([sid,'Optional motion',name,'Per linked still setup',action,'Horizontal + vertical','Website motion; campaign',setup,'','','','','',''])

if __name__=='__main__':
    results=[photographer(),maker_packet()]
    checklist()
    (TMP/'build-report.json').write_text(json.dumps(results,indent=2))
    print(json.dumps(results,indent=2))
