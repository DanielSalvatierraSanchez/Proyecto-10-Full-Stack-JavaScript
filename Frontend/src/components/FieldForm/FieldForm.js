import "./FieldForm.css";

export const FieldForm = ({ labelText, inputType, inputPlaceholder }) => {
    return `
    <div class="field-form">
        <label>${labelText}</label>
        <input type="${inputType}" placeholder="${inputPlaceholder}" required>
    </div>
    `;
};
