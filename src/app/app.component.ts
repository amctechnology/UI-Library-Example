import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {
  initializeComplete,
  InteractionStates,
  setAppHeight,
  SearchRecords,
  registerClickToDial,
  setPresence,
  onPresenceChanged,
  registerOnPresenceChanged,
  registerEnableClickToDial,
  enableClickToDial,
  ChannelTypes,
  InteractionDirectionTypes } from '@amc-technology/davinci-api';
import * as api from '@amc-technology/davinci-api';
import {
  IScenario,
  IOperation,
  IMetadata,
  IInteraction,
  IChatMessageType,
  Property,
  IParty,
  IFocus,
} from "@amc-technology/ui-library";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = "SampleChannelApp";

  iconPack = "https://amcdevstorage.blob.core.windows.net/icon-pack/";
  properties: Property[];
  interaction: IInteraction;
  scenario: IScenario;

  constructor() {
    this.interaction = {
      interactionId: "123",
      operations: [
        {
          title: "Answer Call",
          icon: new URL(this.iconPack + "voice_alerting_answer_normal.gif"),
          handler: async () => {
            console.log("Answering Call");
          },
          operationName: "answer_call",
          operationMetadata: [],
        },
      ],
      // Uncomment this to see associated Data
      // associatedData: [
      //   new Property("Associated Data1", "Giant Coffee Place"),
      //   new Property("Associated Data2", "AAADDD111"),
      // ],
      displayCallTimer: true,
      startTime: new Date().getTime(),
      subheaderData: {
        image: new URL(this.iconPack + "Phone_Number_Icon.png"),
        tooltip: "Phone",
        value: "+1 (555) 555-5555",
      },
      UIHeadersData: {
        maximizeUrl: new URL(this.iconPack + "section_expand.png"),
        minimizeUrl: new URL(this.iconPack + "section_collapse.png"),
        directionText: "Inbound",
        displayHoldCounter: false,
        holdCounterData: {
          currentHoldStartTime: new Date().getTime(),
        },
        statusText: "Ringing",
        statusUrl: new URL(this.iconPack + "Status_Ringing.png"),
      },
    };
    this.scenario = { interactions: [this.interaction] };


  }

  async ngOnInit() {
    await initializeComplete().then((configReturn) => {
      this.config = configReturn;
    });
    registerOnPresenceChanged(async (presence, reason, appname) => {
      if (appname !== this.config.name) {
        setPresence(presence, reason);
      }
    });
  }

  ngAfterViewChecked() {
    setAppHeight(document.body.clientHeight);
  }

  onMinimizedChanged() {
    console.log("Minimized changed!");
  }
}
