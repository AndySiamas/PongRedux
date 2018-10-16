import Time from '../Utilities/Time/Time.jsx';
import ServerManager from '../ServerManager.jsx';

class _UpdateManager {
    constructor() {
        // SETUP
        this.server = 'http://127.0.0.1:1600';

        // EVENTS
        this.createServerEmitters();
    }
    // ---------------------------------------------------
    // SERVER EMITTERS -------------------------------------
    // ---------------------------------------------------
    createServerEmitters() {

    }
};

const UpdateManager = new _UpdateManager();
export default UpdateManager;