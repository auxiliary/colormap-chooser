# colormap-chooser
A widget for choosing colorbrewer colormaps

### Requires
- jQuery
- Bootstrap
- D3
- Colorbrewer

### Usage
```javascript
$("colormap").cmchooser();
```

### Events
```javascript
$("colormap").on("change", function(event, key){
  console.log(key);
});
```
