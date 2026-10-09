import { StrataMark } from "@/components/ui/StrataMark";
import styles from "@/components/studio/TradePages.module.css";

export default function MakersLoading() {
  return (
    <div className={styles.loading} role="status">
      <StrataMark size="compact" align="left" />
      <p>Opening the maker studio.</p>
    </div>
  );
}
