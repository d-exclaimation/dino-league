//
//  Skeleton.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import type { FC, ReactNode } from "react";

type Props = {
  loading: boolean;
  children: ReactNode;
  className?: string;
};

const Skeleton: FC<Props> = ({ className, loading, children }) => {
  if (!loading) {
    return <>{children}</>;
  }
  return (
    <div
      className={`${
        className ?? ""
      } animate-pulse rounded-xl bg-slate-700 brightness-200`}
    >
      <div className="opacity-0">{children}</div>
    </div>
  );
};

export default Skeleton;
