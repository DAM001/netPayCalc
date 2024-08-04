function calculateNetto() {
    let brutto = parseFloat(document.getElementById('brutto').value) || 0;

    let family = document.getElementById('family').checked;
    let firstMarried = document.getElementById('firstMarried').checked;
    let illness = document.getElementById('illness').checked;
    let under25 = document.getElementById('under25').checked;
    let under30Mother = document.getElementById('under30Mother').checked;
    let manyChildren = document.getElementById('manyChildren').checked;

    // Constants
    const szja = 0.15;
    const nyugdij = 0.10;
    const egeszseg = 0.085;
    const szocialis_hozzajarulas = 0.135; // 13.5% social contribution tax
    const szakkepzesi_hozzajarulas = 0.015; // 1.5% vocational training contribution

    // Base deductions
    let deductions = brutto * (szja + nyugdij + egeszseg);
    let netto = brutto - deductions;

    // Modifiers in percentages
    if (family) {
        netto += brutto * 0.05; // 5% family tax allowance
    }
    if (firstMarried) {
        netto += brutto * 0.05; // 5% first married tax allowance
    }
    if (illness) {
        netto += brutto * 0.02; // 2% illness allowance
    }
    if (under25) {
        netto += brutto * 0.07; // 7% under 25 allowance
    }
    if (under30Mother) {
        netto += brutto * 0.05; // 5% under 30 mothers allowance
    }
    if (manyChildren) {
        netto += brutto * 0.10; // 10% three or more children allowance
    }

    let nettoPercentage = (netto / brutto) * 100;

    document.getElementById('netto').innerText = `${netto.toFixed(0)} HUF`;
    document.getElementById('nettoPercentage').innerText = `(${nettoPercentage.toFixed(0)}%)`;

    // Calculate employer's cost
    let employerCost = brutto * (1 + szocialis_hozzajarulas + szakkepzesi_hozzajarulas);
    document.getElementById('employerCost').innerText = `A munkáltató költsége: ${employerCost.toFixed(0)} HUF`;
}

function updateCheckboxes() {
    let under25 = document.getElementById('under25');
    let under30Mother = document.getElementById('under30Mother');

    if (under25.checked) {
        under30Mother.disabled = true;
    } else {
        under30Mother.disabled = false;
    }

    if (under30Mother.checked) {
        under25.disabled = true;
    } else {
        under25.disabled = false;
    }

    calculateNetto();
}

// Event listeners
document.getElementById('brutto').addEventListener('input', calculateNetto);
document.querySelectorAll('.checkbox-wrapper input').forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckboxes);
});

// Initial calculation
calculateNetto();
