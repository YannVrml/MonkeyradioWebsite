import type { Radio } from "@monkey-radio/api-client";
import { defineStore } from "pinia";
import { useAPI } from "@/services/api";

type Config = {
  radio?: Radio;
  title: string;
  picture: string;
  Live: {
    url: string;
    HQUrl: string;
    type: "hls" | "ice";
    metadataUrl: string;
  };
  Auto: {
    url: string;
  };
};

export const useRadioConfig = defineStore("radioConfig", {
  state(): Config {
    return {
      title: "",
      picture: "",
      Live: {
        url: "",
        HQUrl: "",
        type: "hls",
        metadataUrl: "",
      },
      Auto: {
        url: "",
      },
    };
  },
  actions: {
    async retrieveRadioConfig() {
      const api = useMonkeyRadioAPI();
      const domain = window.location.hostname;
      const config = await api.radio.fromDomain(domain);
      this.title = config.name;
      this.radio = config;

      const oldApi = useAPI();
      const oldRadio = await oldApi.getRadioConfig();
      this.Live.metadataUrl = oldRadio.onair.LiveMetadataURL;
    },
  },
  getters: {
    liveLink(state) {
      return state.radio?.liveStream.find((s) => s.details === "live");
    },
  },
});
