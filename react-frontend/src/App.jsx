import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

// Initial form structure
const initialForm = {
  title: "",
  type: "",
  status: "",
  category: "",
  amount: "",
};

function App() {
  // Button control (register / edit mode)
  const [btnRegister, setBtnRegister] = useState(true);

  // Backend data
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Form data state
  const [formData, setFormData] = useState(initialForm);

  // Load incomes and expenses from backend
  const loadData = () => {
    fetch("http://localhost:8080/incomes")
      .then((res) => res.json())
      .then(setIncomes);

    fetch("http://localhost:8080/expenses")
      .then((res) => res.json())
      .then(setExpenses);
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  // Save income or expense
  const handleSave = async (data) => {
    // Endpoint selection based on type
    const url =
      data.type === "income"
        ? "http://localhost:8080/incomes"
        : "http://localhost:8080/expenses";

    // Payload sent to backend
    const payload = {
      title: data.title,
      amount: Number(data.amount),
      status: data.status,
      category: data.category,
    };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Reset form and reload table
    setFormData(initialForm);
    loadData();
  };

  // Merge incomes and expenses into one table
  const mergedData = [
    ...incomes.map((i) => ({ ...i, type: "income" })),
    ...expenses.map((e) => ({ ...e, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Newer first

  // Select item
  const selectItem = (item) => {
    // 1. Populate the form with the item data
    setFormData({
      id: item.id, // Ensure ID is kept for future PUT/DELETE requests
      title: item.title,
      type: item.type,
      status: item.status,
      category:
        item.category ||
        item.expenseCategory?.title ||
        item.incomeCategory?.title,
      amount: item.amount.toString(), // Convert number to string for the input field
    });

    setBtnRegister(false);
  };

  // Function to reset form and buttons
  const handleCancel = () => {
    setFormData(initialForm);
    setBtnRegister(true);
  };

  // Remove item
  const handleRemove = async () => {
    if (!formData.id) {
      alert("Selecione um item para remover.");
      return;
    }

    // Endpoint selection based on type
    const url =
      formData.type === "income"
        ? `http://localhost:8080/incomes/${formData.id}`
        : `http://localhost:8080/expenses/${formData.id}`;

    try {
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        handleCancel(); // Clear form and reset buttons using the function we made before
        loadData(); // Refresh the table
      } else {
        console.error("Failed to remove the item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Update item
  const handleUpdate = async () => {
    if (!formData.id) return;

    const url =
      formData.type === "income"
        ? `http://localhost:8080/incomes/${formData.id}`
        : `http://localhost:8080/expenses/${formData.id}`;

    const payload = {
      title: formData.title,
      amount: Number(formData.amount),
      status: formData.status,
      category: formData.category,
    };

    try {
      const response = await fetch(url, {
        method: "PUT", // Method for updating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        handleCancel();
        loadData();
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <br></br> 
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <h1>Financial Manager</h1>
        <h2>Gerenciador de Finanças</h2>
      </div>
      <br></br>

      {/* Form */}
      <Form
        button={btnRegister}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSave}
        onCancel={handleCancel}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
      />

      {/* Table */}
      <Table data={mergedData} select={selectItem} />
    </div>
  );
}

export default App;
