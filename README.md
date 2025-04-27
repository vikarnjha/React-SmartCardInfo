# 🔐 SmartCardManager

**SmartCardManager** is a secure and intelligent system for managing and analyzing card information.  
It enables users to store, protect, and retrieve card details with real-time card variant detection, issuing bank identification, and robust user authentication.

---

## 🚀 Features

- ✅ **Secure card storage** with encryption (AES)
- ✅ **Card variant detection** (Visa, MasterCard, RuPay, AmEx, etc.)
- ✅ **Issuing bank identification** using BIN/IIN (first 6 digits) via external API
- ✅ **Google Sign Up and Login** integration (OAuth 2.0)
- ✅ **Email-based Forgot Password** (via OTP or reset link)
- ✅ **Change Password** functionality (from old password)
- ✅ **Dynamic card UI** with flip animation (front and back preview)
- ✅ **Authentication system** with JWT tokens

---

## 🧠 Tech Stack

| Layer         | Technology                      |
|---------------|----------------------------------|
| Frontend      | React.js + Tailwind CSS          |
| Backend       | Node.js + Express.js             |
| Database      | MongoDB (for user and card storage) |
| Authentication| JWT, bcrypt, Google OAuth 2.0    |
| Security      | AES encryption for card numbers  |
| External APIs | BIN/IIN Lookup APIs              |

---

## 🧪 How It Works

1. ✍️ User signs up (with email-password or Google account).
2. 🔐 Card details are saved securely with AES encryption.
3. 🔎 First 6 digits (BIN/IIN) are used to fetch card variant and issuing bank via API call.
4. 🔑 Forgot password and password change flows handled securely.
5. 📦 All cards are displayed with a **live, animated** card preview.
6. 🔓 Cards are decrypted only when displaying to the user.

---

## 📊 Example Output

```json
{
  "card_variant": "Visa",
  "card_type": "Debit",
  "issuing_bank": "ICICI Bank",
  "card_number_encrypted": "U2FsdGVkX1+89abcdeFGHIJKLmn=="
}
```

---

## 📋 Key Modules

- **Authentication** — Secure signup/login (Email & Google)
- **Forgot Password** — Email-based password reset system
- **Change Password** — Update password using old password
- **Card Manager** — Add, View, Update, Delete cards securely
- **Card Analyzer** — Identify card variant and issuing bank using API
- **Dynamic Card UI** — Real-time preview with animations

---

## 🌟 Future Enhancements

- 🔐 Implement Two-Factor Authentication (2FA)
- 🌐 Build public APIs for external integrations
- 📱 Create a mobile-first Progressive Web App (PWA)
- 📈 Improve user dashboard with analytics and usage stats
- 🧾 Export card data securely in user reports

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ❤️ Support

If you like **SmartCardManager**, please ⭐ the repository and share it with others!  
Your support helps keep the project growing!
