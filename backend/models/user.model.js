const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Is library ka istemal ho raha hai

const userSchema = new mongoose.Schema({
    // ... (name, email, password, role fields)
}, { timestamps: true });

// Password ko save karne se pehle encrypt karein
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- YAHAN Galti ho sakti hai ---
// Login ke dauraan password match karne ke liye method
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Yeh line check karein.
    // 'enteredPassword' pehle, 'this.password' (database wala) baad me.
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

