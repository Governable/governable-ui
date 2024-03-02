import { clsx } from 'clsx';
import Header from '@/components/layout/header/Header';
import styles from './Home.module.css';

export default function HomeHeader() {
  return (
    <div className={styles.HomeHeader}>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className={clsx(styles.HomeHeaderHeadline, 'font-robotoMono')}>GOVERNABLE</h1>
        <p className={styles.HomeHeaderParagraph}>
          Cross-chain governance for any ERC20 or ERC721 token, with or without checkpoints.
          <br />
          Vote on L2. Execute on L1.
        </p>
      </div>
    </div>
  );
}
