let sidebarWidth=120;

let headerHTML = `
<h1>John Conway&#39;s Game of Life</h1>

<p>This is a simulation of <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Life</a>, a cellular automaton in which simple rules generate complex behavior.</p>

<p>Each cell interacts with its eight neighbors and follows four rules:</p>

<ol>
    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
</ol>

<p>Use the buttons to play with the simulation. Draw on the screen to create or destroy cells (works best while paused).</p>`
