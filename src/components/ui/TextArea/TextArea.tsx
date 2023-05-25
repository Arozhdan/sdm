import cn from "classnames";
import styles from "./TextArea.module.css";
import { type FC } from "react";
import { type TextAreaProps } from "./TextArea.props";

export const TextArea: FC<TextAreaProps> = ({
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
  const classes = cn(styles.TextAreaWrapper, styles[color], className, {
    [styles.error || ""]: error,
    [styles.fullWidth || ""]: fullWidth,
    [styles.showLabel || ""]: showLabel,
  });
  return (
    <div className={classes}>
      <label>
        {label && showLabel && <span className={styles.label}>{label}</span>}
        {topHint && <span className={styles.topHint}>{topHint}</span>}
        <textarea
          className={styles.TextArea}
          {...props}
          placeholder={placeholder}
        />
        {bottomHint && !error && (
          <span className={styles.bottomHint}>{bottomHint}</span>
        )}
        {error && <span className={styles.error}>{error}</span>}
      </label>
    </div>
  );
};
