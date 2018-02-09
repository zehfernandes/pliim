// Pliim

import { ipcRenderer } from "electron";
import { bind } from "decko";
import { h, Component } from "preact"; // eslint-disable-line no-unused-vars

export default class App extends Component {
  state = {
    turnOn: false,
    options: {
      desktop: true,
      notification: true,
      apps: true,
      mute: false,
      wallpaper: false
    }
  };

  @bind
  _handleOptionClick(opt) {
    const options = this.state.options;

    options[opt] = options[opt] ? false : true;

    ipcRenderer.send("storeConfig", options);
    this.setState({
      options
    });
  }

  @bind
  _handleToggleClick() {
    const turnOn = this.state.turnOn;

    if (turnOn) {
      ipcRenderer.send("turnOff");
    } else {
      ipcRenderer.send("turnOn", this.state.options);
    }

    this.setState({
      turnOn: turnOn ? false : true
    });
  }

  @bind
  _handleInstall() {
    ipcRenderer.send("install-update");
  }

  componentWillMount() {
    ipcRenderer.on("update-downloaded", () => {
      this.setState({
        notify: true
      });
    });

    ipcRenderer.send("getConfig");
    ipcRenderer.on("listeningConfigs", (store, options) => {
      console.log(options);
      this.setState({
        options
      });
    });
  }

  render({}, { notify }) {
    return (
      <div>
        <div class="arrow" />

        <div class="window">
          <section class="main-action">
            <h2>Presentation mode</h2>

            <div class="toggle">
              <div class="row">
                <input
                  type="checkbox"
                  name="fancy-checkbox"
                  id="fancy-checkbox"
                />
                <label onClick={this._handleToggleClick} for="fancy-checkbox">
                  Checkbox
                </label>
              </div>
            </div>
          </section>

          <ul class="options">
            <li
              onClick={() => this._handleOptionClick("desktop")}
              class={this.state.options.desktop ? "active" : ""}
            >
              Hide desktop icons
            </li>
            <li
              onClick={() => this._handleOptionClick("notification")}
              class={this.state.options.notification ? "active" : ""}
            >
              Disable notifications
            </li>
            <li
              onClick={() => this._handleOptionClick("apps")}
              class={this.state.options.apps ? "active" : ""}
            >
              Hide active apps
            </li>
            <li
              onClick={() => this._handleOptionClick("mute")}
              class={this.state.options.mute ? "active" : ""}
            >
              Mute speakers
            </li>
            <li
              onClick={() => this._handleOptionClick("wallpaper")}
              class={this.state.options.wallpaper ? "active" : ""}
            >
              Change wallpaper
            </li>
          </ul>

          {notify ? (
            <div class="update" onClick={this._handleInstall}>
              <span class="pr1">🎉</span> New version is available
              <a href="#" class="">
                click here to install it
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
