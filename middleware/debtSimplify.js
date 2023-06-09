exports.simplifyExpenses = (contributors, divisionMethod) => {
    for (const key in contributors) {
        contributors[key] = parseFloat(contributors[key]);
    }
    console.log(divisionMethod);
    const totalExpense = Object.values(contributors).reduce(
        (prev, total) => total + prev
    );
    if (divisionMethod === "equal") {
        // console.log(totalExpense);
        const transactions = separateEqual(contributors, totalExpense);
        // console.log(transactions);
        return transactions;
    }
};

function separateEqual(contributors, totalExpense) {
    const perPerson =
        Math.round((totalExpense / Object.keys(contributors).length) * 100) / 100;
    //   console.log(perPerson);

    let creditors = [];
    for (const [person, amount] of Object.entries(contributors)) {
        if (amount - perPerson >= 0) {
            creditors.push({
                name: person,
                contribution: amount,
                owed: amount - perPerson,
            });
        }
    }
    //   console.log(creditors);

    let debtors = [];
    for (const [person, amount] of Object.entries(contributors)) {
        if (amount - perPerson < 0) {
            debtors.push({
                name: person,
                contribution: amount,
                owes: perPerson - amount,
            });
        }
    }
    //   console.log(debtors, "\n\nLoop\n");

    const transactions = [];
    for (const creditor of creditors) {
        while (creditor.owed !== 0) {
            for (let i = 0; i < debtors.length;) {
                const debtor = debtors[i];
                const x = creditor.owed - debtor.owes;

                if (x > 0) {
                    transactions.push({
                        paidBy: debtor.name,
                        paidTo: creditor.name,
                        amount: debtor.owes,
                    });
                    creditor.owed = x;
                    debtor.owes = 0;
                    debtors.splice(i, 1); // remove debtor from array
                } else if (x < 0) {
                    transactions.push({
                        paidBy: debtor.name,
                        paidTo: creditor.name,
                        amount: creditor.owed,
                    });
                    creditor.owed = 0;
                    debtor.owes = -x;
                    i++;
                } else {
                    transactions.push({
                        paidBy: debtor.name,
                        paidTo: creditor.name,
                        amount: debtor.owes,
                    });
                    creditor.owed = 0;
                    debtor.owes = x;
                    debtors.splice(i, 1); // remove debtor from array
                }
            }
        }
    }
    //   console.log(transactions);
    return transactions;
}
