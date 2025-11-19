const express = require("express");
const dotenv = require("dotenv");
const { supabase } = require("../services/supabaseClient");

dotenv.config();
const router = express.Router();

router.post("/signup-doctor", async (req, res) => {
  try {
    const { docid, email, password } = req.body;

    // 1️⃣ Signup with Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    const user = data.user;

    // 2️⃣ Insert into doctors table
    const { error: insertError } = await supabase
      .from("doctors")
      .insert([{ id: user.id, docid, email }]);

    if (insertError) return res.status(400).json({ error: insertError.message });

    res.status(201).json({ message: "Signup successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/login-doctor", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(404).json({ error: error.message })
    }
    const user = data.user;

    const { data: doctorData, error: fetchError } = await supabase
      .from("doctors")
      .select("docid")
      .eq("id", user.id)
      .single();

    if (fetchError) {
      return res.status(400).json({ error: fetchError.message });
    }

    res.status(200).json({
      message: "Login successful",
      user,
      session: data.session,
      docid: doctorData?.docid || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

module.exports = router;
