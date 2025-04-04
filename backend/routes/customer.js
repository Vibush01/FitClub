const express = require('express');
     const router = express.Router();
     const auth = require('../middleware/auth');
     const User = require('../models/User');
     const WorkoutPlan = require('../models/WorkoutPlan');
     const DietPlan = require('../models/DietPlan');
     const MacroLog = require('../models/MacroLog');
     const BodyProgress = require('../models/BodyProgress');

     // Middleware to restrict to customer role
     const customerOnly = (req, res, next) => {
       if (req.user.role !== 'customer') {
         return res.status(403).json({ error: 'Access denied: Customers only' });
       }
       next();
     };

     // View Workout Plan
     router.get('/workout-plan', auth, customerOnly, async (req, res) => {
       try {
         const workoutPlan = await WorkoutPlan.findOne({ userId: req.user.id });
         if (!workoutPlan) {
           return res.status(404).json({ error: 'Workout plan not found' });
         }
         res.json(workoutPlan);
       } catch (err) {
         res.status(500).json({ error: err.message });
       }
     });

     // View Diet Plan
     router.get('/diet-plan', auth, customerOnly, async (req, res) => {
       try {
         const dietPlan = await DietPlan.findOne({ userId: req.user.id });
         if (!dietPlan) {
           return res.status(404).json({ error: 'Diet plan not found' });
         }
         res.json(dietPlan);
       } catch (err) {
         res.status(500).json({ error: err.message });
       }
     });

     // Log Daily Macros
     router.post('/macro-log', auth, customerOnly, async (req, res) => {
       const { date, protein, carbs, fats, calories } = req.body;
       try {
         const macroLog = new MacroLog({
           userId: req.user.id,
           date,
           protein,
           carbs,
           fats,
           calories,
         });
         await macroLog.save();
         res.status(201).json(macroLog);
       } catch (err) {
         res.status(500).json({ error: err.message });
       }
     });

     // View Macro Logs
     router.get('/macro-logs', auth, customerOnly, async (req, res) => {
       try {
         const macroLogs = await MacroLog.find({ userId: req.user.id }).sort({ date: -1 });
         res.json(macroLogs);
       } catch (err) {
         res.status(500).json({ error: err.message });
       }
     });

     // Log Body Progress
     router.post('/body-progress', auth, customerOnly, async (req, res) => {
       const { date, weight, bodyFat, muscleMass, images } = req.body;
       try {
         const bodyProgress = new BodyProgress({
           userId: req.user.id,
           date,
           weight,
           bodyFat,
           muscleMass,
           images: images || [],
         });
         await bodyProgress.save();
         res.status(201).json(bodyProgress);
       } catch (err) {
         res.status(500).json({ error: err.message });
       }
     });

     // View Body Progress
     router.get('/body-progress', auth, customerOnly, async (req, res) => {
       try {
         const bodyProgress = await BodyProgress.find({ userId: req.user.id }).sort({ date: -1 });
         res.json(bodyProgress);
       } catch (err) {
         res.status(500).json({ error: err.message });
       }
     });

     module.exports = router;