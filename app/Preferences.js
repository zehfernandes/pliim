// Pliim

import { ipcRenderer } from "electron";
import { bind } from "decko";
import { h, Component, render } from "preact"; // eslint-disable-line no-unused-vars

export default class Preferences extends Component {
  state = {
    autoLaucher: true,
    wallPaper: "Black Color"
  };

  @bind
  _handleAutoLaucher() {
    const toogle = this.state.autoLaucher;

    this.setState({
      autoLaucher: toogle ? false : true
    });

    ipcRenderer.send("set-laucher", this.state.autoLaucher);
  }

  @bind
  _handleWallpaper() {
    ipcRenderer.send("choose-wallpaper");
  }

  componentWillMount() {
    ipcRenderer.send("getPreferences");
    ipcRenderer.on("listeningPreferences", (store, options) => {
      this.setState({
        wallPaper:
          options.wallPaper != null ? options.wallPaper : this.state.wallPaper,
        autoLaucher:
          options.autoLaucher != null
            ? options.autoLaucher
            : this.state.autoLaucher
      });
    });
  }

  render({}, { notify }) {
    return (
      <div>
        <div class="preference-option">
          <div class="preference-info">
            <h3>Start automatically</h3>
            <p>Launch Pliim on system startup</p>
          </div>

          <div class="preference-action">
            <div class="toggle">
              <div class="row">
                <input
                  type="checkbox"
                  checked={this.state.autoLaucher}
                  name="fancy-checkbox"
                  id="fancy-checkbox"
                />
                <label onClick={this._handleAutoLaucher}>Checkbox</label>
              </div>
            </div>
          </div>
        </div>

        <div class="preference-option">
          <div class="preference-info">
            <h3>Replaced Wallpaper</h3>
            <p>{this.state.wallPaper}</p>
          </div>

          <div class="preference-action">
            <div onClick={this._handleWallpaper} class="img-upload">
              Choose
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<Preferences />, document.body);
