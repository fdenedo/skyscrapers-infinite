# Infinite Skyscrapers: brief

Agreed 2026-10-06. Build 1 of 3 in the earning plan (`my-learning-os/career/PLAN.md`). A fresh repo, public from the first push. The 2025 attempts stay as they are; I can copy my own CSS and board markup from `skyscrapers-js` for sitting 4.

## The puzzle

An N×N grid of buildings with heights 1 to N. Every row and every column holds each height exactly once. A clue on the edge says how many buildings you can see looking along that row or column from that side. A taller building hides every shorter one behind it.

The row `2 1 4 3` shows 2 from the left (the 2 and the 4) and 2 from the right (the 3 and the 4). The row `1 2 3 4` shows 4 from the left and 1 from the right.

A puzzle shows some of the clues and an empty grid. The player fills in the grid.

## Why this one, and what went wrong before

There are three earlier attempts in `repos/`. `skyscrapers-js` (Jan–Feb 2025, 17 commits) has a playable board, pencil marks and GSAP animations, but its puzzles are typed in by hand. `skyscrapers-react` has no commits and `skyscrapers-kt` has no code. Each time the interface got the hours and the hard part never got started.

So this time the order is fixed: logic first, with tests, and the interface last and plain. The generator and solver are what a reviewer will ask about. Pencil marks and animation are what I get to play with after it ships.

## What v1 does

1. **Visibility counter.** Given a line of heights, return how many are visible from its start. Unit tests, including the edge cases I pick.
2. **Solver.** Given a size and a set of clues, count solutions and stop at 2. A valid puzzle has exactly one.
3. **Generator.** A puzzle number always gives the same puzzle, so a link with a puzzle number in it can be shared. That's what "infinite" means. Start from a full solution, work out every clue, then remove clues while the solver still finds exactly one solution. The full set of clues doesn't always pin down one solution; I decide what the generator does when it doesn't.
4. **Playable grid.** Select a cell, type a height, clear it. Show when a row or column repeats a height. Say when the grid is solved.
5. **Saved progress.** Reload the page and my entries for that puzzle are still there.
6. **Sizes.** 4×4 and 5×5.

## Done means

Someone on a machine I've never touched can:

- open the live link and play puzzle 1 and puzzle 48213 at both sizes;
- clone the repo, run `npm ci`, see `npm test` pass and `npm run dev` start, on the Node version the repo names;
- see CI green on GitHub Actions for the latest commit;
- read a README with what it is, how to run it, and five or six Decisions bullets.

A 5×5 puzzle generates in under a second in the browser. I measure it and put the number in the README.

## Not in v1

Pencil marks, hints, difficulty levels, undo, a timer, animation, accounts, a backend, a UI framework. Sizes above 5×5 only if the one-second budget holds.

## Who writes what

I write the visibility counter, the solver, the generator, the shape of the saved state, and where the code splits into modules.

AI explains, looks things up and helps with setup and tooling errors. It may draft the CSS and the CI workflow file, and I read every line before committing them. No AI-written code in the four core pieces.

## Decisions I'll be grilled on

- How the grid and clues are represented, and why.
- How the solver cuts down the search, and how slow it gets at 6×6.
- Why the generator takes a seed, and what keeps puzzle 48213 the same in every browser and after I change the code.
- What the saved state looks like, and what happens to old saves when that shape changes.
- Which code is pure and unit-tested, which touches the page, and where that line sits.
- Each tooling choice, and what each line of `tsconfig.json` and `package.json` does.

## Setup

TypeScript with `strict`, plain HTML and the DOM, no framework. Vite serves and bundles; Vitest runs the tests. I write `package.json` scripts and `tsconfig.json` by hand rather than from a template, with a reason for each line, the way N3 did it. Node 26 is pinned in `engines` and `.nvmrc`, and the lockfile is committed. In the browser, Vite reads the imports, so the Node rule from N5 (name the exact emitted `.js` file) doesn't apply here, and I should be able to say why. The React Flow take-home broke on the reviewers' MacBooks, and this is the fix.

## Sittings (about 90 minutes each)

1. Tue 6 Oct: agree this brief, create the repo, set up, visibility counter with tests.
2. Solver with tests.
3. Generator, seeded, with the timing measured.
4. Grid and saved progress.
5. CI, deploy, README. Ship.

Ship target: Sun 11 Oct. Hard date: Wed 14 Oct. Then the grill, the Decisions bullets, and the following week a timed redo of the visibility counter or the solver without AI.
