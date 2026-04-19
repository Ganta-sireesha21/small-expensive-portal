import supabase from "../services/supabaseClient.js";
import { calculateBalance } from "../utils/balance.js";

// ➕ ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { title, amount, group_id, member_ids } = req.body;

    // 1️⃣ Insert expense (NO member_id)
    const { data: expense, error } = await supabase
      .from("expenses")
      .insert([{ title, amount, group_id }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // 2️⃣ Create splits
    const splitAmount = amount / member_ids.length;

    const splits = member_ids.map((member) => ({
      expense_id: expense.id,
      member_id: member,
      amount: splitAmount,
    }));

    await supabase.from("splits").insert(splits);

    res.status(201).json({ expense, splits });

  } catch (err) {
    console.error("Add Expense Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// 📥 GET EXPENSES
export const getExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;

    const { data: expenses, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("group_id", groupId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const { data: splits } = await supabase
      .from("splits")
      .select("*")
      .in("expense_id", expenses.map((e) => e.id));

    const expensesWithSplits = expenses.map((expense) => ({
      ...expense,
      splits: splits.filter((s) => s.expense_id === expense.id),
    }));

    res.status(200).json(expensesWithSplits);

  } catch (err) {
    console.error("Get Expenses Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// 🔍 GET EXPENSE BY ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: expense, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const { data: splits } = await supabase
      .from("splits")
      .select("*")
      .eq("expense_id", id);

    res.status(200).json({ ...expense, splits });

  } catch (err) {
    console.error("Get Expense Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// ✏️ UPDATE EXPENSE
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount } = req.body;

    const { data: expense, error } = await supabase
      .from("expenses")
      .update({ title, amount })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // get existing splits
    const { data: oldSplits } = await supabase
      .from("splits")
      .select("*")
      .eq("expense_id", id);

    const splitAmount = amount / oldSplits.length;

    const updatedSplits = oldSplits.map((s) => ({
      expense_id: id,
      member_id: s.member_id,
      amount: splitAmount,
    }));

    await supabase.from("splits").upsert(updatedSplits);

    res.status(200).json({ ...expense, splits: updatedSplits });

  } catch (err) {
    console.error("Update Expense Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// 🗑️ DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    await supabase
      .from("splits")
      .delete()
      .eq("expense_id", id);

    res.status(200).json({ message: "Expense deleted" });

  } catch (err) {
    console.error("Delete Expense Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// 💰 GET BALANCE
export const getBalance = async (req, res) => {
  try {
    const { groupId } = req.params;

    const { data: members, error: membersError } = await supabase
      .from("members")
      .select("*")
      .eq("group_id", groupId);

    if (membersError) {
      return res.status(500).json({ error: membersError.message });
    }

    const { data: expenses, error: expensesError } = await supabase
      .from("expenses")
      .select("*")
      .eq("group_id", groupId);

    if (expensesError) {
      return res.status(500).json({ error: expensesError.message });
    }

    const balance = calculateBalance(members, expenses);

    res.status(200).json(balance);

  } catch (err) {
    console.error("Balance Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};