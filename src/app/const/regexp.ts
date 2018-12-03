export class Regexp {
  public static EMAIL = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
  // public static PASSWORD_MIN_LENGTH_6=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/;
  public static BELLARUSSIAN_PHONE = /^\+375 \((17|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;
  public static LATIN_NAME = /^[A-Za-z]*$/;
  public static CYRILIC_NAME = /^[А-Яа-я]$/;
}
