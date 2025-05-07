import React, { useState } from "react";
import styled from "styled-components";

const Switch = ({ onToggle }: { onToggle?: (isChecked: boolean) => void }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onToggle?.(newChecked);
  };

  return (
    <StyledWrapper>
      <label htmlFor="filter" className="switch" aria-label="Toggle Filter">
        <input
          type="checkbox"
          id="filter"
          checked={isChecked}
          onChange={handleChange}
        />
        <span>ID</span>
        <span>EN</span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    --_switch-bg-clr: rgb(39, 68, 124);
    --_switch-padding: 2px;
    --_slider-bg-clr: rgb(73, 163, 90); /* tetap hijau */
    --_slider-bg-clr-on: rgb(73, 163, 90);
    --_slider-txt-clr: #ffffff;
    --_label-padding: 0.4rem 0.9rem;
    --_switch-easing: cubic-bezier(0.47, 1.64, 0.41, 0.8);
    font-size: 0.75rem;
    color: white;
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-radius: 9999px;
    pointer-events: auto; /* pastikan ini */
    position: relative;
    isolation: isolate;
    cursor: pointer;
    z-index: 10; /* pastikan berada di atas */
  }

  .switch input[type="checkbox"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
    pointer-events: none; /* agar input tidak menghalangi klik */
  }

  .switch > span {
    display: grid;
    place-content: center;
    transition: opacity 300ms ease-in-out 150ms;
    padding: var(--_label-padding);
  }

  .switch::before,
  .switch::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    transition: inset 150ms ease-in-out;
  }

  .switch::before {
    background-color: var(--_slider-bg-clr); /* tetap hijau */
    inset: var(--_switch-padding) 50% var(--_switch-padding)
      var(--_switch-padding);
    transition: inset 500ms var(--_switch-easing),
      background-color 500ms ease-in-out;
    z-index: -1;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3),
      0 1px rgba(255, 255, 255, 0.3);
  }

  .switch::after {
    background-color: var(--_switch-bg-clr);
    inset: 0;
    z-index: -2;
  }

  .switch:focus-within::after {
    inset: -0.25rem;
  }

  .switch:has(input:checked):hover > span:first-of-type,
  .switch:has(input:not(:checked)):hover > span:last-of-type {
    opacity: 1;
    transition-delay: 0ms;
    transition-duration: 100ms;
  }

  .switch:has(input:checked):hover::before {
    inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding)
      45%;
  }

  .switch:has(input:not(:checked)):hover::before {
    inset: var(--_switch-padding) 45% var(--_switch-padding)
      var(--_switch-padding);
  }

  .switch:has(input:checked)::before {
    inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding)
      50%;
  }

  .switch > span:last-of-type,
  .switch > input:checked + span:first-of-type {
    opacity: 0.75;
  }

  .switch > input:checked ~ span:last-of-type {
    opacity: 1;
  }
`;

export default Switch;
