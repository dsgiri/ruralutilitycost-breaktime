# Game Completion Plan

Currently, all 6 micro-games are using a prototype placeholder in `GamePlayer.tsx`. Here is the plan to implement full functionality for each of them.

## 1. Match the Equipment (Matching)
- [x] Create `src/games/MatchEquipment.tsx`.
- [x] Define equipment list (icons/images and names).
- [x] Implement a two-column layout: one with icons, one with names.
- [x] Add click-to-match or drag-and-drop logic.
- [x] Add win state and score tracking.

## 2. Sort the Supplies (Sorting)
- [x] Create `src/games/SortSupplies.tsx`.
- [x] Define supply categories (e.g., Tools, Feed, Medical).
- [x] Present random items one by one.
- [x] User clicks the corresponding bin to sort.
- [x] Add timer and score based on speed/accuracy.

## 3. Crop Memory Grid (Memory)
- [x] Create `src/games/CropMemory.tsx`.
- [x] Define pairs of crop cards using Lucide icons.
- [x] Implement standard memory card flip logic (reveal two, check match, hide if wrong).
- [x] Track moves and time to complete.

## 4. Quick Weather Choice (Timing/Decision)
- [x] Create `src/games/WeatherChoice.tsx`.
- [x] Define a set of weather scenarios (e.g., "Approaching Storm", "Drought").
- [x] Display multiple-choice actions.
- [x] Add a rapid countdown timer for each question.
- [x] Calculate score based on correct choices and remaining time.

## 5. Animal ID Flash Cards (Educational)
- [x] Create `src/games/AnimalID.tsx`.
- [x] Define animal/breed data with corresponding traits or visual icons.
- [x] Implement flashcard UI with multiple choice answers.
- [x] Track correct/incorrect answers and provide immediate feedback.

## 6. Harvest Timing Trivia (Trivia)
- [x] Create `src/games/HarvestTrivia.tsx`.
- [x] Prepare 10-15 trivia questions related to agriculture and harvesting.
- [x] Implement quiz UI with progress bar.
- [x] Show final score and accuracy percentage.

## Integration
- [x] Refactor `GamePlayer.tsx` to dynamically load the corresponding game component based on `gameId`.
- [x] Hook up the local storage stats (games played, streak) to trigger when a game is actually completed.
