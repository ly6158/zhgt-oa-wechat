App({
  globalData: {
    ScreenInfo: {
      CapsuleWidth: 0, // 胶囊宽度
      CapsuleHeight: 0, // 胶囊高度
      CapsuleRight: 0, // 胶囊居右
      StatusBarHeight: 0, // 状态栏高度
      NavigateBarHeight: 0, // 导航栏高度
      IndicatorHeight: 0, // 底部指示线高度
    },
  },
  onLaunch: function() {
    // 胶囊 的相关信息
    const _Capsule = wx.getMenuButtonBoundingClientRect()
    // 窗口 相关信息
    const _WindowInfo = wx.getWindowInfo();
    // 安全区域（部分手机没有）
    const _SafeArea = _WindowInfo.safeArea ?? {bottom:0}
    const _ScreenHeight = _WindowInfo.screenHeight

    this.globalData.ScreenInfo = {
      CapsuleHeight: _Capsule.height,
      CapsuleWidth: _Capsule.width,
      CapsuleRight: _Capsule.right,
      StatusBarHeight: _WindowInfo.statusBarHeight,
      NavigateBarHeight: _Capsule.height + (_Capsule.top - _WindowInfo.statusBarHeight) * 2,
      IndicatorHeight: _ScreenHeight - _SafeArea.bottom > 0 ? _ScreenHeight - _SafeArea.bottom - 10 : 0,
    }
  },
})