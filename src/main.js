/**
 * This is the interval, measured in seconds, at which to run the script.
 * In other words, this is how often the script should run.
 *
 * The default value is 3 minutes.
 * If you want to change how often the script runs, modify this value.
 */
const intervalSeconds = (3 * 60);

/**
 * Convert from seconds to milliseconds, since javascript intervals
 * are measured in milliseconds.
 */
const intervalMillis = intervalSeconds * 1000;

/**
 * The function for performing the mouse jiggle.
 *
 * We simulate mouse movement by creating a "mousemove" event and
 * dispatching it to the DOM.
 * This creates "fake" mouse movement.
 * ie. The web page thinks the user has moved their mouse, but the user's
 * mouse position doesn't actually change.
 *
 * That way we can trigger DOM listeners (eg. ones monitoring for user activity)
 * without getting in the user's way by legitimately moving the mouse.
 */
function moveMouse(){
	var evt = new MouseEvent("mousemove", {
        view: window,
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(evt);
}

function fetchHostIdle() {
    try {
        fetch('http://localhost:21080', {
            method: 'GET'
        }).then(result => {  // if not 200 OK response, emulate mouse move
            if (result.status != 200) {
                moveMouse()
                // console.log("moveMouse() not ok")
            }
        }).catch(error => {  // on error, emulate mouse move
            moveMouse()
            // console.log("moveMouse() catch promise")
        });
    } catch (error) {
        // on error, emulate mouse move
        moveMouse()
        // console.log("moveMouse() catch")
    }
}

/**
 * Finally, tell the web page to check if the host is idle
 */
setInterval(fetchHostIdle, intervalMillis);
