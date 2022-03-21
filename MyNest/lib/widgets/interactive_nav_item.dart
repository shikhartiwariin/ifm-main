import 'package:universal_html/html.dart' as html;
import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/widgets.dart';

class InteractiveNavItem extends MouseRegion {
  static final appContainer =
      html.window.document.querySelectorAll('flt-glass-pane')[0];
  final String text;
  final bool selected;
  final Function onHighlight;
  final String routeName;

  InteractiveNavItem(
      {Widget? child,
      required this.text,
      required this.selected,
      required this.onHighlight,required this.routeName})
      : super(
            onHover: (PointerHoverEvent evt) {
              appContainer.style.cursor = 'pointer';
            },
            onExit: (PointerExitEvent evt) {
              appContainer.style.cursor = 'default';
            },
            child: Text(text));
}

class InteractiveText extends StatefulWidget {
  final String text;

  const InteractiveText({required this.text});

  get selected => null;

  @override
  InteractiveTextState createState() => InteractiveTextState();
}

class InteractiveTextState extends State<InteractiveText> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    var kPageTitleStyle;
    return MouseRegion(
      onHover: (_) => _hovered(true),
      onExit: (_) => _hovered(false),
      child: Text(widget.text,
          style: _hovering
              ? kPageTitleStyle.copyWith(
                  color: Colors.white, decoration: TextDecoration.underline)
              : (widget.selected)
                  ? kPageTitleStyle.copyWith(color: Colors.red)
                  : kPageTitleStyle),
    );
  }

  _hovered(bool hovered) {
    setState(() {
      _hovering = hovered;
    });
  }
}
