# CS1320-final-project

## To run
1. In terminal, navigate into this directory
2. Run "npm install" to install dependencies
3. Run "npm run start" to start server
4. Open a browser window and go to "localhost:8080" to see the site

## Current Progress
- Home, search, article, about us, join us, and author pages hardcoded
- All pages responsive to screen resizing

## Design Decisions
### Title font
- Used text for title instead of image on current site/in mockups in order to better accommodate screen readers
### Responsiveness
- Most viewed sidebar disappears at screen widths below 850 pixels
### User Interactions
- Current defaults are
    - Navbar hover: underline
    - About/Archive/Join Us: none
    - Article title hover: underline

## Works In Progress
### Responsiveness
- Could change navigation bar to dropdown menu
### Accessibility
- ARIA roles
- Keyboard navigation
### Interactivity
- Need to make pages link together
- Need to handle form submits
### Templating
- Need to populate looped over items
### Routing
- Need to handle requests with parameters

## Known Bugs
- Featured article and individual article images could scale better