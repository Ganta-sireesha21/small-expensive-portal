export function calculateBalance(members, splits ) {
    const balance = {};
    members.forEach(member => {
        balance[member.id] = 0;
    });
    splits.forEach(split => {
        balance[split.member_id] += split.amount;
    });
    return balance;

}
