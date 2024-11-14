#  :kiss: kiss-components.js
Ultra minimalistic UI/Web components and Chrome extension Javascript framework. (OMG not another one!)

There are two parts to this "framework" that are related but can be used independantly from eachother:
- KISS-WebUI, This is a minimal WebComponent framework that provides just enough scaffold to define a UI App and Components
- KISS-Chrome-extension, This is a minimal library (yes, this one is just a library) to help with writing Chrome extensions

And I suppose there is third part to all of this:
- Set of boilerplate templates that go along with the peices mentioned above, as a way to setup projects quickly and define the intended approach

## WebUI Overview
- A simplified way to define WebComponents
...
...
...
  
## Chrome-extension Overview
- A message dispatching and command registration system to allow interactions between the extension and the content sctipts (where the actual website code/ data reside)
- A way to easily inject content scripts in the site and use code sparated in ECMA modules
