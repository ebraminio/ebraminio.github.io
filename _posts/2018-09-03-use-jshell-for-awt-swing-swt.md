---
layout: post
title: "Use jshell (or Kotlin) for playing with AWT, Swing or SWT"
---


JShell is a Java language REPL console shipped along newer versions of JDK. If you have access to it you can have fun using it for playing with GUI toolkits. I will demonstrate a simple use of AWT, Swing and SWT using JShell.

(you will need to add semicolon (;) at the end of each line of the below codes if you are going to run them from a regular Java source file)

AWT
===

```js
$ jshell
import java.awt.*
import java.awt.event.*
new Frame("") // Possibly the first attempt fails, so
var frame = new Frame("AWT Hello World")
frame.setSize(400, 400)
frame.setLayout(new GridLayout(0, 2))
frame.add(new Button("Button 1"))
frame.add(new Button("Button 2"))
var button = new Button("Print 'Hello World'")
button.addActionListener(x -> System.out.println("Hello World"))
frame.add(button)
frame.addWindowListener(new WindowAdapter() { @Override public void windowClosing(WindowEvent we) { System.exit(0); } })
frame.setVisible(true)
//
Thread.sleep(1000)
frame.add(new Button("Last Button!"))
frame.revalidate() // should be revalidated if a widget added after frame made visibile
System.out.println("Finished!")
```

You can also use Kotlin, if installed properly and the code will be highly declarative and cool IMO:
```js
$ kotlinc-jvm -Djava.awt.headless=false
import java.awt.*
Frame("") // Possibly the first attempt fails, so

Frame("AWT Hello World").apply {
  setSize(400, 400)
  setVisible(true)
  setLayout(GridLayout(0, 2))
  add(Button("Button 1"))
  add(Button("Button 2"))
  add(Button("Print 'Hello World'").apply {
    addActionListener({ println("Hello World") })
  })
}
```

![AWT](https://i.imgur.com/fUTbXNj.png)

Swing
=====

```js
$ jshell
import javax.swing.*
import java.awt.GridLayout

new JFrame() // Possibly the first attempt fails, so
var frame = new JFrame()
UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName())
frame.setTitle("Swing Hello World")
frame.setSize(400, 400)
frame.setLayout(new GridLayout(0, 2))
frame.setLocationRelativeTo(null)
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)
frame.add(new JButton("Button 1"))
frame.add(new JButton("Button 2"))
var button = new JButton("Print 'Hello World'")
button.addActionListener(x -> System.out.println("Hello World"))
frame.add(button)
frame.setVisible(true)
//
Thread.sleep(1000)
frame.add(new Button("Last Button!"))
frame.revalidate() // should be revalidated if a widget added after frame made visibile
System.out.println("Finished!")
```

![Swing](https://i.imgur.com/iQdtHe8.png)

SWT
===

First install SWT on you distribution, something like `apt install libswt-cairo-gtk-4-jni libswt-gtk-4-java libswt-gtk-4-jni`, then:
```js
$ jshell --class-path /usr/lib/java/swt-gtk-4.6.0.jar
import org.eclipse.swt.*
import org.eclipse.swt.graphics.*
import org.eclipse.swt.layout.*
import org.eclipse.swt.widgets.*

var display = new Display()
Shell shell = new Shell(display);
shell.setLayout(new RowLayout())
shell.setText("SWT Hello World")

var text = new Text(shell, SWT.NONE);
text.setText("A text editor")

new Button(shell, SWT.PUSH).setText("Button 1");
new Button(shell, SWT.PUSH).setText("Button 2");
var button = new Button(shell, SWT.PUSH)
button.setText("Print 'Hello World'");
button.addListener(SWT.Selection, e -> System.out.println("Hello World"))
button.setImage(display.getSystemImage(SWT.ICON_QUESTION))

shell.setSize(300, 300)
shell.open()
while (!shell.isDisposed())
  if (!display.readAndDispatch())
    display.sleep()
display.dispose()
```

Even the fact SWT has the most appealing and native UI, it doesn't work nice on REPL. I should see if there any trick to make it work easier.

![SWT](https://i.imgur.com/BMmu64r.png)

JavaFX
======
Eh, maybe later