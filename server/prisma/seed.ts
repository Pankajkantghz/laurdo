import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  MuscleCategory,
  MovementFocus,
} from "../src/generated/prisma/client";
import { config } from "../src/config";

const pool = new Pool({ connectionString: config.databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface SeedExercise {
  name: string;
  description: string;
  category: MuscleCategory;
  movementFocus?: MovementFocus;
}

const RAW_GLOBAL_EXERCISES: SeedExercise[] = [
  // ==========================================
  // CHEST
  // ==========================================

  {
    name: "Barbell Bench Press",
    description:
      "Flat barbell press targeting chest, front delts, and triceps.",
    category: "CHEST",
    movementFocus: "BENCH_PRESS",
  },
  {
    name: "Incline Barbell Bench Press",
    description: "Incline barbell press emphasizing the upper chest.",
    category: "CHEST",
  },
  {
    name: "Decline Barbell Bench Press",
    description: "Decline barbell press emphasizing the lower chest.",
    category: "CHEST",
  },
  {
    name: "Flat Dumbbell Press",
    description: "Flat dumbbell press targeting the chest.",
    category: "CHEST",
  },
  {
    name: "Incline Dumbbell Press",
    description: "Incline dumbbell press emphasizing the upper chest.",
    category: "CHEST",
  },
  {
    name: "Decline Dumbbell Press",
    description: "Decline dumbbell press emphasizing the lower chest.",
    category: "CHEST",
  },
  {
    name: "Flat Machine Chest Press",
    description: "Machine-based horizontal chest press.",
    category: "CHEST",
  },
  {
    name: "Incline Machine Chest Press",
    description: "Incline machine press targeting the upper chest.",
    category: "CHEST",
  },
  {
    name: "Decline Machine Chest Press",
    description: "Decline machine press targeting the lower chest.",
    category: "CHEST",
  },
  {
    name: "Cable Chest Fly",
    description: "Cable fly targeting the chest muscles.",
    category: "CHEST",
  },
  {
    name: "Low-to-High Cable Fly",
    description: "Upward cable fly emphasizing the upper chest.",
    category: "CHEST",
  },
  {
    name: "High-to-Low Cable Fly",
    description: "Downward cable fly emphasizing the lower chest.",
    category: "CHEST",
  },
  {
    name: "Dumbbell Chest Fly",
    description: "Flat bench dumbbell fly for chest isolation.",
    category: "CHEST",
  },
  {
    name: "Incline Dumbbell Fly",
    description: "Incline dumbbell fly emphasizing the upper chest.",
    category: "CHEST",
  },
  {
    name: "Pec Deck Fly",
    description: "Machine-based chest isolation exercise.",
    category: "CHEST",
  },
  {
    name: "Chest Dips",
    description: "Forward-leaning dips emphasizing the chest.",
    category: "CHEST",
  },
  {
    name: "Weighted Dips",
    description: "Weighted parallel-bar dips for chest and triceps.",
    category: "CHEST",
  },
  {
    name: "Standard Push-ups",
    description: "Bodyweight horizontal pushing exercise.",
    category: "CHEST",
  },
  {
    name: "Diamond Push-ups",
    description: "Close-hand push-ups emphasizing the triceps.",
    category: "CHEST",
  },
  {
    name: "Archer Push-ups",
    description: "Unilateral-focused bodyweight push-up variation.",
    category: "CHEST",
  },
  {
    name: "Plyometric Push-ups",
    description:
      "Explosive push-ups performed with a powerful upward movement.",
    category: "CHEST",
  },
  {
    name: "Hindu Push-ups (Dand)",
    description:
      "Traditional Indian dynamic push-up combining a dive and upward arch.",
    category: "CHEST",
  },

  // ==========================================
  // SHOULDERS
  // ==========================================

  {
    name: "Barbell Military Press",
    description: "Strict standing barbell overhead press.",
    category: "SHOULDER",
  },
  {
    name: "Seated Barbell Shoulder Press",
    description: "Seated barbell overhead shoulder press.",
    category: "SHOULDER",
  },
  {
    name: "Dumbbell Military Press",
    description: "Standing dumbbell overhead press.",
    category: "SHOULDER",
  },
  {
    name: "Seated Dumbbell Shoulder Press",
    description: "Seated dumbbell press targeting the shoulders.",
    category: "SHOULDER",
  },
  {
    name: "Arnold Press",
    description: "Rotational dumbbell shoulder press.",
    category: "SHOULDER",
  },
  {
    name: "Machine Shoulder Press",
    description: "Machine-based overhead shoulder press.",
    category: "SHOULDER",
  },
  {
    name: "Push Press",
    description: "Overhead barbell press using leg drive.",
    category: "SHOULDER",
  },
  {
    name: "Landmine Press",
    description: "Angled barbell press targeting shoulders and upper chest.",
    category: "SHOULDER",
  },
  {
    name: "Single-Arm Landmine Press",
    description: "Unilateral angled barbell shoulder press.",
    category: "SHOULDER",
  },
  {
    name: "Landmine Push Press",
    description: "Explosive landmine press using leg drive.",
    category: "SHOULDER",
  },
  {
    name: "Dumbbell Lateral Raise",
    description: "Dumbbell raise targeting lateral deltoids.",
    category: "SHOULDER",
  },
  {
    name: "Cable Lateral Raise",
    description: "Cable isolation exercise for lateral deltoids.",
    category: "SHOULDER",
  },
  {
    name: "Machine Lateral Raise",
    description: "Machine-based lateral deltoid isolation.",
    category: "SHOULDER",
  },
  {
    name: "Barbell Upright Row",
    description: "Barbell upright row targeting deltoids and upper traps.",
    category: "SHOULDER",
  },
  {
    name: "Dumbbell Upright Row",
    description: "Dumbbell upright row targeting shoulders and traps.",
    category: "SHOULDER",
  },
  {
    name: "Cable Upright Row",
    description: "Cable upright row for shoulders and upper traps.",
    category: "SHOULDER",
  },
  {
    name: "Dumbbell Rear Delt Fly",
    description: "Bent-over dumbbell fly targeting rear deltoids.",
    category: "SHOULDER",
  },
  {
    name: "Incline Bench Rear Delt Row",
    description:
      "Chest-supported incline dumbbell row targeting rear deltoids.",
    category: "SHOULDER",
  },
  {
    name: "Cable Rear Delt Fly",
    description: "Cable fly targeting posterior deltoids.",
    category: "SHOULDER",
  },
  {
    name: "Reverse Pec Deck",
    description: "Machine-based rear deltoid fly.",
    category: "SHOULDER",
  },
  {
    name: "Face Pull",
    description: "Cable pulling exercise for rear delts and upper back.",
    category: "SHOULDER",
  },

  // ==========================================
  // BACK
  // ==========================================

  {
    name: "Conventional Deadlift",
    description: "Full-body floor pull emphasizing posterior chain and back.",
    category: "BACK",
    movementFocus: "DEADLIFT",
  },
  {
    name: "Sumo Deadlift",
    description: "Wide-stance deadlift emphasizing hips and legs.",
    category: "BACK",
    movementFocus: "DEADLIFT",
  },
  {
    name: "Trap Bar Deadlift",
    description: "Deadlift performed using a hexagonal bar.",
    category: "BACK",
    movementFocus: "DEADLIFT",
  },
  {
    name: "Deficit Deadlift",
    description: "Deadlift performed while standing on an elevated platform.",
    category: "BACK",
    movementFocus: "DEADLIFT",
  },
  {
    name: "Barbell Bent-Over Row",
    description: "Overhand barbell row targeting lats and mid-back.",
    category: "BACK",
  },
  {
    name: "Underhand Barbell Row",
    description: "Supinated-grip barbell row targeting lats and back.",
    category: "BACK",
  },
  {
    name: "Overhand Dumbbell Row",
    description: "Pronated-grip dumbbell row for back development.",
    category: "BACK",
  },
  {
    name: "Underhand Dumbbell Row",
    description: "Supinated-grip dumbbell row targeting the back.",
    category: "BACK",
  },
  {
    name: "Single-Arm Dumbbell Row",
    description: "Unilateral dumbbell row targeting the lats.",
    category: "BACK",
  },
  {
    name: "Chest-Supported Dumbbell Row",
    description: "Incline bench-supported dumbbell row.",
    category: "BACK",
  },
  {
    name: "Seated Cable Row",
    description: "Horizontal cable row targeting the mid-back.",
    category: "BACK",
  },
  {
    name: "Close-Grip Seated Cable Row",
    description: "Close-grip cable row emphasizing the lats.",
    category: "BACK",
  },
  {
    name: "Wide-Grip Seated Cable Row",
    description: "Wide-grip cable row targeting upper and mid-back.",
    category: "BACK",
  },
  {
    name: "Machine Row",
    description: "Machine-based horizontal pulling exercise.",
    category: "BACK",
  },
  {
    name: "Lat Pulldown - Overhand Grip",
    description: "Pronated-grip vertical pull targeting the lats.",
    category: "BACK",
  },
  {
    name: "Lat Pulldown - Underhand Grip",
    description: "Supinated-grip vertical pull targeting lats and biceps.",
    category: "BACK",
  },
  {
    name: "Close-Grip Lat Pulldown",
    description: "Close-grip vertical cable pull.",
    category: "BACK",
  },
  {
    name: "Neutral-Grip Lat Pulldown",
    description: "Neutral-grip vertical pull targeting the lats.",
    category: "BACK",
  },
  {
    name: "Pull-ups",
    description: "Overhand bodyweight vertical pulling exercise.",
    category: "BACK",
  },
  {
    name: "Weighted Pull-ups",
    description: "Weighted overhand pull-ups for back strength.",
    category: "BACK",
  },
  {
    name: "Chin-ups",
    description: "Underhand bodyweight vertical pull.",
    category: "BACK",
  },
  {
    name: "Wide-Grip Pull-ups",
    description: "Wide-grip overhand pull-ups.",
    category: "BACK",
  },
  {
    name: "Commando Pull-ups",
    description: "Side-facing pull-up variation using a neutral grip.",
    category: "BACK",
  },
  {
    name: "Australian Pull-ups",
    description: "Inverted bodyweight row using a horizontal bar.",
    category: "BACK",
  },
  {
    name: "Straight-Arm Pulldown",
    description: "Cable isolation exercise targeting the lats.",
    category: "BACK",
  },
  {
    name: "Barbell Shrugs",
    description: "Barbell shoulder elevation for trapezius development.",
    category: "BACK",
  },
  {
    name: "Dumbbell Shrugs",
    description: "Dumbbell shoulder elevation targeting upper traps.",
    category: "BACK",
  },
  {
    name: "Cable Shrugs",
    description: "Cable-based trapezius exercise.",
    category: "BACK",
  },
  {
    name: "Dead Hang",
    description: "Isometric hanging exercise for grip and shoulder endurance.",
    category: "BACK",
  },

  // ==========================================
  // BICEPS AND TRICEPS
  // ==========================================

  {
    name: "Barbell Bicep Curl",
    description: "Standing barbell curl targeting the biceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Dumbbell Bicep Curl",
    description: "Dumbbell curl for biceps development.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Hammer Curl",
    description:
      "Neutral-grip dumbbell curl targeting brachialis and forearms.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Incline Dumbbell Curl",
    description: "Incline bench dumbbell curl emphasizing the biceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Preacher Curl",
    description: "Supported curl targeting the biceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "EZ Bar Curl",
    description: "EZ-bar curl for biceps development.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Cable Bicep Curl",
    description: "Cable curl providing continuous biceps tension.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Concentration Curl",
    description: "Single-arm supported dumbbell biceps curl.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Barbell Skull Crusher",
    description: "Lying barbell triceps extension.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Dumbbell Skull Crusher",
    description: "Lying dumbbell triceps extension.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Overhead Dumbbell Triceps Extension",
    description: "Overhead dumbbell extension targeting the triceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Single-Arm Dumbbell Triceps Extension",
    description: "Unilateral overhead dumbbell triceps extension.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Overhead Barbell Triceps Extension",
    description: "Overhead barbell extension for triceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Overhead Cable Triceps Extension",
    description:
      "Cable overhead extension emphasizing the long head of the triceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Rope Triceps Pushdown",
    description: "Rope cable pushdown targeting the triceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Straight Bar Triceps Pushdown",
    description: "Straight-bar cable pushdown for triceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Reverse-Grip Triceps Pushdown",
    description: "Underhand cable pushdown targeting the triceps.",
    category: "BICEPS_TRICEPS",
  },
  {
    name: "Bench Dips",
    description: "Bodyweight triceps-focused dips using a bench.",
    category: "BICEPS_TRICEPS",
  },

  // ==========================================
  // LEGS
  // ==========================================

  {
    name: "Barbell Back Squat",
    description:
      "Barbell squat targeting quadriceps, glutes, and trunk stability.",
    category: "LEG",
    movementFocus: "BACK_SQUAT",
  },
  {
    name: "Barbell Front Squat",
    description: "Front-rack squat emphasizing quadriceps and upright posture.",
    category: "LEG",
  },
  {
    name: "Box Squat",
    description: "Squat performed by sitting back onto a box.",
    category: "LEG",
    movementFocus: "BACK_SQUAT",
  },
  {
    name: "Goblet Squat",
    description: "Dumbbell or kettlebell front-loaded squat.",
    category: "LEG",
  },
  {
    name: "Dumbbell Squat",
    description: "Squat performed while holding dumbbells.",
    category: "LEG",
  },
  {
    name: "Hack Squat",
    description: "Machine-based squat targeting quadriceps.",
    category: "LEG",
  },
  {
    name: "Smith Machine Squat",
    description: "Squat performed using a guided Smith machine.",
    category: "LEG",
  },
  {
    name: "Bulgarian Split Squat",
    description: "Single-leg squat with the rear foot elevated.",
    category: "LEG",
  },
  {
    name: "Walking Lunges",
    description: "Alternating forward lunges while walking.",
    category: "LEG",
  },
  {
    name: "Reverse Lunges",
    description: "Backward stepping lunge targeting legs and glutes.",
    category: "LEG",
  },
  {
    name: "Forward Lunges",
    description: "Forward stepping unilateral leg exercise.",
    category: "LEG",
  },
  {
    name: "Jump Squats",
    description: "Explosive squat variation with a vertical jump.",
    category: "LEG",
  },
  {
    name: "Pistol Squats",
    description: "Single-leg bodyweight squat.",
    category: "LEG",
  },
  {
    name: "Hindu Squats (Baithak)",
    description: "Traditional Indian bodyweight squat variation.",
    category: "LEG",
  },
  {
    name: "Bodyweight Squats",
    description: "Unweighted squat for lower-body strength and endurance.",
    category: "LEG",
  },
  {
    name: "Leg Press",
    description: "Machine-based compound leg pressing exercise.",
    category: "LEG",
  },
  {
    name: "Leg Extension",
    description: "Machine isolation exercise for quadriceps.",
    category: "LEG",
  },
  {
    name: "Seated Leg Curl",
    description: "Seated machine hamstring curl.",
    category: "LEG",
  },
  {
    name: "Lying Leg Curl",
    description: "Prone machine hamstring curl.",
    category: "LEG",
  },
  {
    name: "Standing Leg Curl",
    description: "Single-leg standing hamstring curl.",
    category: "LEG",
  },
  {
    name: "Romanian Deadlift",
    description: "Hip-hinge exercise emphasizing hamstrings and glutes.",
    category: "LEG",
    movementFocus: "DEADLIFT",
  },
  {
    name: "Hip Thrust",
    description: "Hip extension exercise targeting glutes.",
    category: "LEG",
  },
  {
    name: "Glute Bridge",
    description: "Floor-based hip extension for glutes.",
    category: "LEG",
  },
  {
    name: "Hip Abduction Machine",
    description: "Machine exercise targeting hip abductors.",
    category: "LEG",
  },
  {
    name: "Hip Adduction Machine",
    description: "Machine exercise targeting inner thigh muscles.",
    category: "LEG",
  },
  {
    name: "Standing Calf Raise",
    description: "Standing calf raise targeting gastrocnemius.",
    category: "LEG",
  },
  {
    name: "Seated Calf Raise",
    description: "Seated calf raise emphasizing soleus.",
    category: "LEG",
  },
  {
    name: "Leg Press Calf Raise",
    description: "Calf raise performed on a leg press machine.",
    category: "LEG",
  },
  {
    name: "Single-Leg Calf Raise",
    description: "Unilateral bodyweight calf raise.",
    category: "LEG",
  },
  {
    name: "Tibialis Raise",
    description: "Dorsiflexion exercise targeting the tibialis anterior.",
    category: "LEG",
  },

  // ==========================================
  // OLYMPIC WEIGHTLIFTING
  // ==========================================

  {
    name: "Snatch",
    description:
      "Olympic lift moving the bar from floor to overhead in one motion.",
    category: "OTHER",
    movementFocus: "SNATCH",
  },
  {
    name: "Power Snatch",
    description: "Explosive snatch caught above a deep squat position.",
    category: "OTHER",
    movementFocus: "SNATCH",
  },
  {
    name: "Hang Snatch",
    description: "Snatch variation initiated from the hang position.",
    category: "OTHER",
    movementFocus: "SNATCH",
  },
  {
    name: "Clean and Jerk",
    description: "Olympic lift combining a clean and overhead jerk.",
    category: "OTHER",
    movementFocus: "CLEAN_AND_JERK",
  },
  {
    name: "Power Clean",
    description: "Explosive barbell clean caught in a partial squat.",
    category: "OTHER",
    movementFocus: "CLEAN_AND_JERK",
  },
  {
    name: "Hang Clean",
    description: "Clean variation initiated from above the knees.",
    category: "OTHER",
    movementFocus: "CLEAN_AND_JERK",
  },
  {
    name: "Push Jerk",
    description: "Overhead barbell jerk using leg drive.",
    category: "OTHER",
    movementFocus: "CLEAN_AND_JERK",
  },
  {
    name: "Single-Arm Dumbbell Clean and Jerk",
    description: "Unilateral dumbbell clean followed by an overhead jerk.",
    category: "OTHER",
    movementFocus: "CLEAN_AND_JERK",
  },
  {
    name: "Alternating Dumbbell Clean and Jerk",
    description: "Alternating dumbbell clean and jerk between arms.",
    category: "OTHER",
    movementFocus: "CLEAN_AND_JERK",
  },
  {
    name: "Clean Pull",
    description: "Explosive pulling movement used to develop clean strength.",
    category: "BACK",
    movementFocus: "CLEAN_AND_JERK",
  },

  // ==========================================
  // ABS AND CORE
  // ==========================================

  {
    name: "Crunches",
    description: "Floor-based abdominal flexion exercise.",
    category: "ABS",
  },
  {
    name: "Cable Crunch",
    description: "Weighted abdominal crunch using a cable machine.",
    category: "ABS",
  },
  {
    name: "Hanging Leg Raise",
    description: "Hanging core exercise raising straight legs.",
    category: "ABS",
  },
  {
    name: "Hanging Knee Raises",
    description: "Hanging abdominal exercise raising bent knees.",
    category: "ABS",
  },
  {
    name: "Lying Leg Raises",
    description: "Floor-based straight-leg abdominal exercise.",
    category: "ABS",
  },
  {
    name: "Reverse Crunch",
    description: "Reverse abdominal curl emphasizing pelvic movement.",
    category: "ABS",
  },
  {
    name: "Plank",
    description: "Isometric core stabilization exercise.",
    category: "ABS",
  },
  {
    name: "Side Plank",
    description: "Lateral core stabilization exercise.",
    category: "ABS",
  },
  {
    name: "L-Sit",
    description: "Isometric bodyweight hold with legs extended.",
    category: "ABS",
  },
  {
    name: "V-Ups",
    description: "Dynamic abdominal exercise bringing hands and feet together.",
    category: "ABS",
  },
  {
    name: "Russian Twists",
    description: "Rotational abdominal exercise.",
    category: "ABS",
  },
  {
    name: "Pallof Press",
    description:
      "Anti-rotation core exercise using a cable or resistance band.",
    category: "ABS",
  },
  {
    name: "Cable Woodchops",
    description: "Rotational cable exercise targeting the obliques.",
    category: "ABS",
  },
  {
    name: "Landmine Rotation",
    description: "Rotational barbell movement targeting the core and trunk.",
    category: "ABS",
  },
  {
    name: "Medicine Ball Rotational Throw",
    description: "Explosive rotational medicine ball throw.",
    category: "ABS",
  },
  {
    name: "Superman Hold",
    description: "Prone isometric hold targeting posterior trunk muscles.",
    category: "ABS",
  },
  {
    name: "Turkish Get-Up",
    description: "Full-body movement transitioning from the floor to standing.",
    category: "ABS",
  },

  // ==========================================
  // FOREARMS AND GRIP
  // ==========================================

  {
    name: "Farmer's Walk",
    description: "Loaded carry developing grip, traps, and core strength.",
    category: "FOREARMS",
  },
  {
    name: "Wrist Curl",
    description: "Wrist flexion exercise targeting forearm flexors.",
    category: "FOREARMS",
  },
  {
    name: "Reverse Wrist Curl",
    description: "Wrist extension exercise targeting forearm extensors.",
    category: "FOREARMS",
  },
  {
    name: "Reverse Barbell Curl",
    description: "Pronated-grip curl targeting forearms and brachialis.",
    category: "FOREARMS",
  },
  {
    name: "Plate Pinch Hold",
    description:
      "Grip exercise holding weight plates between fingers and thumb.",
    category: "FOREARMS",
  },
  {
    name: "Wrist Roller",
    description: "Forearm endurance exercise using a weighted wrist roller.",
    category: "FOREARMS",
  },

  // ==========================================
  // CARDIO AND CONDITIONING
  // ==========================================

  {
    name: "Treadmill Run",
    description: "Indoor running session for endurance or speed.",
    category: "CARDIO",
  },
  {
    name: "Outdoor Running",
    description: "Outdoor running for cardiovascular endurance.",
    category: "CARDIO",
  },
  {
    name: "Sprint Intervals",
    description: "Repeated high-intensity running efforts.",
    category: "CARDIO",
  },
  {
    name: "Cycling",
    description: "Stationary or outdoor cycling for cardiovascular fitness.",
    category: "CARDIO",
  },
  {
    name: "Swimming",
    description: "Swimming session for cardiovascular endurance.",
    category: "CARDIO",
  },
  {
    name: "Walking",
    description: "Walking session for general cardiovascular activity.",
    category: "CARDIO",
  },
  {
    name: "Rowing Machine",
    description: "Full-body cardiovascular rowing exercise.",
    category: "CARDIO",
  },
  {
    name: "Jump Rope",
    description: "Skipping exercise for coordination and conditioning.",
    category: "CARDIO",
  },
  {
    name: "Battle Ropes",
    description: "High-intensity rope waves for conditioning.",
    category: "CARDIO",
  },
  {
    name: "Sled Push",
    description: "Loaded sled pushing for strength and conditioning.",
    category: "CARDIO",
  },
  {
    name: "Sled Pull",
    description: "Loaded sled pulling for strength and conditioning.",
    category: "CARDIO",
  },
  {
    name: "Burpees",
    description:
      "Full-body conditioning exercise combining squat, plank, and jump.",
    category: "CARDIO",
  },
  {
    name: "Box Jumps",
    description: "Explosive vertical jump onto an elevated platform.",
    category: "CARDIO",
  },
  {
    name: "Broad Jumps",
    description: "Explosive horizontal jumping exercise.",
    category: "CARDIO",
  },
  {
    name: "Kettlebell Swings",
    description: "Explosive hip-hinge movement using a kettlebell.",
    category: "CARDIO",
  },
  {
    name: "Tire Flips",
    description: "Full-body tire flipping for strength and conditioning.",
    category: "CARDIO",
  },
  {
    name: "Medicine Ball Chest Pass",
    description: "Explosive forward medicine ball throw.",
    category: "CARDIO",
  },
  {
    name: "Sandbag Shouldering",
    description: "Full-body lift moving a sandbag onto one shoulder.",
    category: "CARDIO",
  },
  {
    name: "Heavy Bag Punching",
    description: "Boxing conditioning using a heavy punching bag.",
    category: "CARDIO",
  },
  {
    name: "Shadow Boxing",
    description: "Boxing movement and striking practice without a partner.",
    category: "CARDIO",
  },
  {
    name: "Mountain Climbers",
    description: "Dynamic plank-based conditioning exercise.",
    category: "CARDIO",
  },
  {
    name: "Bear Crawls",
    description: "Quadrupedal crawling movement for full-body conditioning.",
    category: "CARDIO",
  },
  {
    name: "Crab Walks",
    description:
      "Reverse crawling movement for shoulder and core conditioning.",
    category: "CARDIO",
  },
  {
    name: "Sprawls",
    description:
      "Explosive ground-transition movement used in combat conditioning.",
    category: "CARDIO",
  },

  // ==========================================
  // FLEXIBILITY AND MOBILITY
  // ==========================================

  {
    name: "Mobility Flow",
    description: "Full-body joint mobility routine.",
    category: "FLEXIBILITY",
  },
  {
    name: "Dynamic Stretching",
    description: "Controlled movement through available joint ranges.",
    category: "FLEXIBILITY",
  },
  {
    name: "Static Stretching",
    description: "Holding stretches to improve flexibility.",
    category: "FLEXIBILITY",
  },
  {
    name: "Hip Mobility Drills",
    description: "Movements improving hip joint mobility.",
    category: "FLEXIBILITY",
  },
  {
    name: "Shoulder Mobility Drills",
    description: "Movements improving shoulder range of motion.",
    category: "FLEXIBILITY",
  },
  {
    name: "Thoracic Spine Rotations",
    description: "Rotational mobility exercise for the upper back.",
    category: "FLEXIBILITY",
  },
  {
    name: "Yoga Flow",
    description: "Sequence of yoga postures for mobility and flexibility.",
    category: "FLEXIBILITY",
  },
];

const GLOBAL_EXERCISES: SeedExercise[] = Array.from(
  new Map(
    RAW_GLOBAL_EXERCISES.map((item) => [item.name.trim(), item]),
  ).values(),
);

async function main(): Promise<void> {
  const existing = await prisma.exercise.findMany({
    where: { userId: null },
    select: { id: true, name: true },
  });

  const existingByName = new Map(existing.map((item) => [item.name, item.id]));

  await prisma.$transaction(
    GLOBAL_EXERCISES.map((exercise) => {
      const existingId = existingByName.get(exercise.name);
      if (existingId) {
        return prisma.exercise.update({
          where: { id: existingId },
          data: {
            description: exercise.description,
            category: exercise.category,
            movementFocus: exercise.movementFocus ?? null,
          },
        });
      }

      return prisma.exercise.create({
        data: {
          userId: null,
          name: exercise.name,
          description: exercise.description,
          category: exercise.category,
          movementFocus: exercise.movementFocus ?? null,
        },
      });
    }),
  );

  console.log(`Seeded ${GLOBAL_EXERCISES.length} global exercises.`);
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });