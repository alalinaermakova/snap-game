class Api {
    constructor(config) {
      this._baseUrl = config.baseUrl;
    }
  
    _getResponseData(res) {
      if (!res.ok) {
        return res.json().then((err) => {
          return Promise.reject(err);
        });
      }
      return res.json();
    }
  
    getDeck() {
      return fetch(`${this._baseUrl}/deck/new/shuffle/?deck_count=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return this._getResponseData(res);
      });
    }

    drawCard(deckId) {
        return fetch(`${this._baseUrl}/deck/${deckId}/draw/?count=1`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            return this._getResponseData(res);
    });
  }
}

export const deckApi = new Api({
  baseUrl: "https://deckofcardsapi.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});