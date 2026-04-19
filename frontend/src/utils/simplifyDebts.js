export function simplifyDebts(balances, membersMap) {
    const credits = [];
    const debts = [];
    Object.entries(balances).forEach(([Id, amt]) => {
        if (amt > 0) {
            credits.push({ id: Id, name: membersMap[Id], amount: amt });
        } else if (amt < 0) {
            debts.push({ id: Id, name: membersMap[Id], amount: -amt });
        }
    });
    const result = [];
    debts.forEach(debt => {
        credits.forEach(credit => {
            if (debt.amount === 0) return;
            if (credit.amount === 0) return;
            const amount = Math.min(debt.amount, credit.amount);
            result.push({ from: debt.name, to: credit.name, amount });
            debt.amount -= amount;
            credit.amount -= amount;
        });
    });
    return result;
}