import cn from "classnames";
import styles from "./Input.module.css";
import { type FC } from "react";
import { type InputProps } from "./Input.props";

export const Input: FC<InputProps> = ({
  className,
  label,
  showLabel = false,
  fullWidth = true,
  topHint,
  bottomHint,
  error,
  placeholder = label,
  color = "primary",
  ...props
}) => {
  const classes = cn(styles.inputWrapper, styles[color], className, {
    [styles.error || ""]: error,
    [styles.fullWidth || ""]: fullWidth,
    [styles.showLabel || ""]: showLabel,
  });
  return (
    <div className={classes}>
      <label>
        {label && showLabel && <span className={styles.label}>{label}</span>}
        {topHint && <span className={styles.topHint}>{topHint}</span>}
        <input className={styles.input} {...props} placeholder={placeholder} />
        {bottomHint && !error && (
          <span className={styles.bottomHint}>{bottomHint}</span>
        )}
        {error && <span className={styles.error}>{error}</span>}
      </label>
    </div>
  );
};
