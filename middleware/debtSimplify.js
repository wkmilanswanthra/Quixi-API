// exports.settleDebts = (contributors) => {
//     const totalExpense = Object.values(contributors).reduce((total, amount) => total + amount);
//
//     const averageExpense = totalExpense / Object.keys(contributors).length;
//
//     // Calculate the amount owed by or to each person
//     const balance = {};
//     for (const [person, amount] of Object.entries(contributors)) {
//         balance[person] = amount - averageExpense;
//     }
//
//     // Calculate transactions needed to settle the debts
//     const transactions = [];
//     while (true) {
//         let maxCreditor = null;
//         let maxDebtor = null;
//
//         for (const [person, amount] of Object.entries(balance)) {
//             if (amount > 0 && (maxCreditor === null || amount > balance[maxCreditor])) {
//                 maxCreditor = person;
//             }
//             if (amount < 0 && (maxDebtor === null || amount < balance[maxDebtor])) {
//                 maxDebtor = person;
//             }
//         }
//
//         if (maxCreditor === null || maxDebtor === null) {
//             break;
//         }
//
//         let transferAmount = Math.min(balance[maxCreditor], -balance[maxDebtor]);
//
//         transactions.push({ from: maxDebtor, to: maxCreditor, amount: transferAmount });
//         balance[maxCreditor] -= transferAmount;
//         balance[maxDebtor] += transferAmount;
//     }
//
//     return transactions;
// }

exports.recreateScenario = (transactions) => {
    const contributors = {};

    // Calculate the total amount spent by each person
    for (const {from, amount} of transactions) {
        if (!contributors[from]) {
            contributors[from] = 0;
        }
        contributors[from] -= amount;
    }

    // Calculate the total amount owed to each person
    for (const {to, amount} of transactions) {
        if (!contributors[to]) {
            contributors[to] = 0;
        }
        contributors[to] += amount;
    }

    return contributors;
}

exports.simplifyExpenses = (contributors, divisionMethod) => {
    const totalExpense = Object.values(contributors).reduce((prev, total) => total + prev)
    if (divisionMethod === "equal") {
        console.log(totalExpense);
        const transactions = simplifyDebts(seperateEqual(contributors, totalExpense));
        console.log(transactions);
    }
}

function seperateEqual(contributors, totalExpense) {
    const perPerson = Math.round((totalExpense / Object.keys(contributors).length) * 100) / 100;
    console.log(perPerson);

    let creditors = [];
    for (const [person, amount] of Object.entries(contributors)) {
        if (amount - perPerson >= 0) {
            creditors.push({name: person, contribution: amount, owed: amount - perPerson});
        }
    }
    console.log(creditors)

    let debtors = [];
    for (const [person, amount] of Object.entries(contributors)) {
        if (amount - perPerson < 0) {
            debtors.push({name: person, contribution: amount, owes: perPerson - amount});
        }
    }
    console.log(debtors, "\n\nLoop\n")

    const transactions = []
    for (const creditor of creditors) {
        while (creditor.owed !== 0) {
            for (let i = 0; i < debtors.length; i++) {
                const debtor = debtors[i];
                const x = creditor.owed - debtor.owes;

                if (x > 0) {
                    transactions.push({from: debtor.name, to: creditor.name, amount: debtor.owes});
                    creditor.owed = x;
                    debtor.owes = 0;
                    debtors.splice(i, 1); // remove debtor from array
                } else if (x < 0) {
                    transactions.push({from: debtor.name, to: creditor.name, amount: creditor.owed});
                    creditor.owed = 0;
                    debtor.owes = -x;
                } else {
                    transactions.push({from: debtor.name, to: creditor.name, amount: debtor.owes});
                    creditor.owed = 0;
                    debtor.owes = x;
                    debtors.splice(i, 1); // remove debtor from array
                }
            }
        }
    }
    console.log(transactions)
    return transactions
}

function simplifyDebts(debts) {
    console.log("starting simplification")
    // Step 1
    const debtsTo = {};
    const debtsFrom = {};

    // Step 2
    for (const debt of debts) {
        if (debtsTo[debt.to]) {
            debtsTo[debt.to] += debt.amount;
        } else {
            debtsTo[debt.to] = debt.amount;
        }

        if (debtsFrom[debt.from]) {
            debtsFrom[debt.from] += debt.amount;
        } else {
            debtsFrom[debt.from] = debt.amount;
        }
    }

    // Step 3
    const transactions = [];
    let transactionMade = true;

    while (transactionMade) {
        transactionMade = false;

        // Step 4
        for (const person in debtsTo) {
            if (debtsTo.hasOwnProperty(person)) {
                // Step 5
                for (const otherPerson in debtsFrom) {
                    if (debtsFrom.hasOwnProperty(otherPerson)) {
                        if (debtsTo[person] > 0 && debtsFrom[otherPerson] > 0 && person !== otherPerson) {
                            const amount = Math.min(debtsTo[person], debtsFrom[otherPerson]);
                            transactions.push({from: person, to: otherPerson, amount});
                            debtsTo[person] -= amount;
                            debtsFrom[otherPerson] -= amount;
                            transactionMade = true;
                        }
                    }
                }
            }
        }
    }

    // Step 7
    return transactions;
}