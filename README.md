# 🔍 SmartCardInfo

**SmartCardInfo** is a system that intelligently analyzes card numbers to:
- 🔎 Detect the **card variant** (Visa, MasterCard, RuPay, AmEx, etc.)
- 💳 Predict whether the card is **debit or credit**
- 🏦 Identify the **issuing bank** using IIN/BIN analysis

This project is designed for FinTech applications, banking software, and intelligent payment systems.

---

## 🚀 Features

- ✅ Card type detection using BIN/IIN patterns
- ✅ Machine Learning model to predict **credit vs. debit**
- ✅ BIN-based **issuing bank identification**

---

## 🧠 Tech Stack

| Layer       | Technology                   |
|-------------|------------------------------|
| Frontend    | React.js + Tailwind CSS      |
| Backend     | Node.js + Express            |
| Database    | MongoDB (optional, for logs) |
| ML Model    | Python (scikit-learn) served via Flask/FastAPI |
| Others      | BIN/IIN datasets, custom logic |

---



---

## 🧪 How It Works

1. ✍️ User enters a card number
2. 🧠 The card variant is detected using rule-based pattern matching
3. 🧠 ML model predicts whether the card is **credit or debit**
4. 🏦 BIN/IIN lookup fetches the name of the **issuing bank**
5. 📦 Output is returned in a structured format

---

## 📊 Example Output

```json
{
  "card_variant": "Visa",
  "card_type": "Debit",
  "issuing_bank": "State Bank of India"
}
```

---

## 🔍 Future Enhancements

- 📈 Improve ML model with real-world datasets
- 🔐 Add authentication & user dashboard
- 🌐 Create a public API for external integration
- 📱 Build a mobile-friendly interface
- 🧾 Generate downloadable reports/logs

---


## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ❤️ Support

If you like this project, consider giving it a ⭐ on GitHub and sharing it with your classmates or team!
