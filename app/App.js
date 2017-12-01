// Pliim

import { ipcRenderer } from 'electron';
import { bind } from 'decko';
import { h, Component } from 'preact'; // eslint-disable-line no-unused-vars

export default class App extends Component {
  state = {
    turnOn: false,
    options: {
      desktop: true,
      notification: true,
      apps: true,
      mute: true
    }
  };

  @bind
  _handleOptionClick(opt) {
    const options = this.state.options;

    options[opt] = options[opt] ? false : true;

    this.setState({
      options
    });
  }

  @bind
  _handleToggleClick() {
    const turnOn = this.state.turnOn;

    if (turnOn) {
      ipcRenderer.send('turnOff');
    } else {
      ipcRenderer.send('turnOn', this.state.options);
    }

    this.setState({
      turnOn: turnOn ? false : true
    });
  }

  @bind
  _handleInstall() {
    ipcRenderer.send('install-update');
  }

  componentWillMount() {
    ipcRenderer.on('update-downloaded', () => {
      this.setState({
        notify: true
      });
    });
  }

  render({}, { notify }) {
    return (
      <div>
        <div class="arrow"></div>

        <div class="window">
          <section class="main-action">
            <h2>Presentation mode</h2>

            <div class="toggle">
              <div class="row">
                <input type="checkbox" name="fancy-checkbox" id="fancy-checkbox" />
                <label onClick={ this._handleToggleClick } for="fancy-checkbox">Checkbox</label>
              </div>
            </div>
          </section>

          <ul class="options">
            <li onClick={ () => this._handleOptionClick('desktop') } class={ this.state.options.desktop ? 'active' : '' }>
              Hide Desktop icons
            </li>
            <li onClick={ () => this._handleOptionClick('notification') } class={ this.state.options.notification ? 'active' : '' }>
              Disable Notifications
            </li>
            <li onClick={ () => this._handleOptionClick('apps') } class={ this.state.options.apps ? 'active' : '' }>
              Hide active apps
            </li>
            <li onClick={ () => this._handleOptionClick('mute') } class={ this.state.options.mute ? 'active' : '' }>
              Mute speakers
            </li>
          </ul>

          {
            notify ?
              <div class="update" onClick={ this._handleInstall }>
                <span class="pr1">🎉</span> New version is available
                <a href="#" class="">click here to install it</a>
              </div> :
              null
          }
        </div>
      </div>
    );
  }
}
