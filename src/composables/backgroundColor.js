import { computed } from "vue";

function useBackgroundColor(props) {
  return computed(() => {
    const options = {
      danger: "var(--danger-color)",
      warning: "var(--warning-color)",
      info: "var(--info-color)",
      success: "var(--accent-color)",
    };

    return options[props.variant];
  });
}

const backgroundColorProps = {
    variant: {
        required: false,
        default: "danger",
        validator(value) {
          return ["success", "danger", "warning", "info"].includes(value);
        },
      },
};
export { useBackgroundColor, backgroundColorProps };
