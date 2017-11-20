import { h, Component } from 'preact'
import { ipcRenderer } from 'electron'
import { bind } from 'decko'

export default class App extends Component {
  state = {
    turnOn: false,
    options: { desktop: true, apps: true, notification: true }
  }

  @bind _handleOptionClick(opt) {
    let options = this.state.options
    options[opt] = options[opt] ? false : true
    this.setState({
      options: options
    })
  }

  @bind _handleToggleClick() {
    let turnOn = this.state.turnOn
    if (turnOn) {
      console.log("off")
      ipcRenderer.send("turnOff")
    } else {
      console.log("on")
      ipcRenderer.send("turnOn", this.state.options)
    }
    this.setState({
      turnOn: turnOn ? false : true
    })
  }
  /*
  _handleToggleClick = () => {
    //ipcRenderer("turnOff")
    //ipcRenderer("turnOn", options)
  }
  */

  render() {
    return (
      <div>
        <div class="arrow"></div>
        <div class="window">
          <section class="main-action">
            <h2>Presentation mode</h2>

            <div class="toggle">
              <div class="row">
                <input type="checkbox" name="fancy-checkbox" id="fancy-checkbox" />
                <label onClick={this._handleToggleClick} for="fancy-checkbox">Checkbox</label>
              </div>
            </div>

          </section>
          <ul class="options">
            <li onClick={() => this._handleOptionClick("desktop")} class={this.state.options.desktop ? "active" : ''}>Hide Desktop icons</li>
            <li onClick={() => this._handleOptionClick("notification")} class={this.state.options.notification ? "active" : ''}>Disable Notifications</li>
            <li onClick={() => this._handleOptionClick("apps")} class={this.state.options.apps ? "active" : ''}>Hide active apps</li>
          </ul>
        </div>
      </div>
    );
  }
}