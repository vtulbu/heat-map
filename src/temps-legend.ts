export class TemperatureLegend {
  static TWO_POINT_EIGHT = {
    color: "rgb(69, 117, 180)",
    num: 2.8,
  };
  static THREE_POINT_EIGHT = {
    color: "rgb(69, 117, 180)",
    num: 3.8,
  };
  static THREE_POINT_NINE = {
    color: "rgb(116, 173, 209)",
    num: 3.9,
  };
  static FOUR_POINT_NINE = {
    color: "rgb(116, 173, 209)",
    num: 4.9,
  };
  static FIVE = {
    color: "rgb(171, 217, 233)",
    num: 5.0,
  };
  static SIX = {
    color: "rgb(171, 217, 233)",
    num: 6.0,
  };
  static SIX_POINT_ONE = {
    color: "rgb(224, 243, 248)",
    num: 6.1,
  };
  static SEVEN_POINT_ONE = {
    color: "rgb(224, 243, 248)",
    num: 7.1,
  };
  static SEVEN_POINT_TWO = {
    color: "rgb(255, 255, 191)",
    num: 7.2,
  };
  static EIGHT_POINT_TWO = {
    color: "rgb(255, 255, 191)",
    num: 8.2,
  };
  static EIGHT_POINT_THREE = {
    color: "rgb(254, 224, 144)",
    num: 8.3,
  };

  static NINE_POINT_FOUR = {
    color: "rgb(254, 224, 144)",
    num: 9.4,
  };
  static NINE_POINT_FIVE = {
    color: "rgb(253, 174, 97)",
    num: 9.5,
  };
  static TEN_POINT_FIVE = {
    color: "rgb(253, 174, 97)",
    num: 10.5,
  };
  static TEN_POINT_SIX = {
    color: "rgb(244, 109, 67)",
    num: 10.6,
  };
  static ELEVEN_POINT_SIX = {
    color: "rgb(244, 109, 67)",
    num: 11.6,
  };
  static ELEVEN_POINT_SEVEN = {
    color: "rgb(215, 48, 39)",
    num: 11.7,
  };
  static TWELVE_POINT_EIGHT = {
    color: "rgb(215, 48, 39)",
    num: 12.8,
  };

  static get iterable(): Array<{
    color: string;
    num: number;
  }> {
    return Object.values(this);
  }
}
