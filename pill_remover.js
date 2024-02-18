// TODO
// Find a better way of locating the pill buttons
// Figure out a better event to listen to - DOMContentLoaded?
//
(async function remove_unused_pills() {
  function remover() {
    // Add the exact name of the pills you want to hide here
    var pills_to_remove = [
      "Podcasts & Shows",
      "Artists",
      "By you",
      "By Spotify",
    ];
    // Gets a list of all pill buttons in the carousel

    var target_classname =
      "ChipInner__ChipInnerComponent-sc-1ly6j4j-0 ChipInnerComponent main-useDropTarget-base main-useDropTarget-track main-useDropTarget-local main-useDropTarget-album main-useDropTarget-artist main-useDropTarget-playlist main-useDropTarget-folder main-useDropTarget-episode OxrHhBsQAggwnv6RmqRy main-useDropTarget-show main-useDropTarget-audiobook main-useDropTarget-pseudoPlaylist";
    var visible_pill_buttons =
      document.getElementsByClassName(target_classname);
    // loops through the list
    for (btn in visible_pill_buttons) {
      // gets the text contained in each pill
      var this_text = visible_pill_buttons[btn].innerText;
      // checks if the text is banned
      if (pills_to_remove.includes(this_text)) {
        // and removes it
        visible_pill_buttons[btn].remove();
        console.log(`Removed ${this_text}`);
      }
    }
  }

  console.log("Pill button remover loaded");

  // Currently it listens for clicks before pruning.
  // The reason for the async await 10/20/30ms listeners is to re-remove any bad options
  // after the user clicks on one. It feels like a janky way to do this and you can see
  // that visually it doesn't look great but I am no web dev.
  // If the timer is too short it won't remove them all - some won't have rendered yet
  // If too long it looks ugly - so the compromise is 3 different callbacks.
  //
  document.addEventListener("click", () => {
    console.log("Remover called - click");
    remover();
  });
  document.addEventListener("click", async () => {
    await new Promise((r) => setTimeout(r, 10));
    remover();
  });
  document.addEventListener("click", async () => {
    await new Promise((r) => setTimeout(r, 20));
    remover();
  });
  document.addEventListener("click", async () => {
    await new Promise((r) => setTimeout(r, 30));
    remover();
  });
})();
