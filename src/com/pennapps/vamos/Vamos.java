package com.pennapps.vamos;

import org.apache.cordova.*;
import android.os.Bundle;
import android.app.Activity;

public class Vamos extends DroidGap {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    super.loadUrl("file:///android_asset/www/index.html");
  }
}
