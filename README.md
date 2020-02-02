# simple-dashboard

Simple dashboard based on a Google Sheet

## How it works?

### Create content

Create a google sheet and add somme stuff

Example in French:

| Type                   | Content                                                     | URL                                         |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------- |
| header.title           | Mon Dashboard                                               |                                             |
| header.logo            |                                                             | https://.../logo.png                        |
| header.backgroundImage |                                                             | https://.../image.png                       |
| news.title             | 📣 News                                                     |                                             |
| news                   | Le nouveau dashboard est disponible                         | https://acailly.github.io/simple-dashboard/ |
| future.title           | 📅 A venir                                                  |                                             |
| future                 | Sortie AquaPoney le 15 septembre !                          |                                             |
| future                 | Réunion Trimestrielle le 16 septembre !                     |                                             |
| ongoing.title          | 🔨 En cours                                                 |                                             |
| ongoing                | Doodle pour le theme du prochain "Dejeuner-Partage"         | https://doodle.com/poll/abcdefgh12345       |
| ongoing                | la salle de réunion est indisponible (formation)            |                                             |
| recruitment.title      | 👤 Recrutement                                              |                                             |
| recruitment            | John Doe a postulé, des volontaires pour le 1er entretien ? |                                             |

Rules are:

- 3 columns
- one column is named "type"
- one column is named "content"
- one column is named "url"
- no blank line
- a type tells in which section will be displayed the line content
- the section will be displayed only if there is a line with the type `<section name>.title`
- special types are:
  - `header.title` for the dashboard title
  - `header.logo` for the dashboard logo
  - `header.backgroundImage` for the dashboard background image

### Publish content

Publish your google sheet: https://support.google.com/docs/answer/183965?co=GENIE.Platform%3DDesktop&hl=en

Copy the sheet id from the URL:

```
https://docs.google.com/spreadsheets/d/<THIS IS YOUR SHEET ID>/edit#gid=0
```

Go to:

```
https://acailly.github.io/simple-dashboard/#<PASTE YOUR SHEET ID>
```

### Handle multiple sheets

If your google sheets document has multiple sheets, you can append the number of the sheet to display its data:

```
https://acailly.github.io/simple-dashboard/#<PASTE YOUR SHEET ID>/1    <-- Display content of sheet 1
https://acailly.github.io/simple-dashboard/#<PASTE YOUR SHEET ID>/2    <-- Display content of sheet 2
https://acailly.github.io/simple-dashboard/#<PASTE YOUR SHEET ID>/3    <-- Display content of sheet 3
...
```

## Ideas for future improvements

### Automatic TOC section

If the google sheets document has multiple sheets, append automatically a section at the end of the dashboard that lists the dashboards corresponding to the others sheets

### Export via itty.bitty.site (or equivalent)

Add a button to export the HTML content of the dashboard in a self contained link (all data is contained in the URL).

Example:

```
https://itty.bitty.site/#About/XQAAAAI9BwAAAAAAAAAeHMqHyTY4PyKmqfkwr6ooCXSIMxPQ7ojYR153HqZD3W+keVdvwyoyd+luwncAksvskG/my97qDaUEyfDGB0QDbdURMwS0L90o5EpQ7O+BMmWrcB7fs71TJEJv1I/T/JfksoiYu9CqkeO/3MjEVGWv6XhfDjWJZ9laLARogtAZtwl7FltrwO/ppSfgeKOjxCxTNdUQH9WBM3de22qOzClzeZaSsSM+/ETbHBIHe1Qc+UF7PDfY470lZNjQg3wfOam9KudUiHOOQD3Kn8FLfaae0lmdK4VHRgxpDtL1nExkdF+pzNQAIyktIv3dQUPDKhGJ61c+WBTNP6NI5AvZ0uFT+Mc2oG0mMUwwuupCrjTxxpYv3l4L3W5lBXqWDjEH+cL8VZc6xz4WwIMG5J9jaQTv1SSxJ1dLg2Z2F7iNQ0fCFI74yeqBM1koHGbscBj4GpwWuA7y/fMCu3sEzcwefjBOuUwDdDfsdxqQLnjywtBxR5qHmngo/agjHyILkZxU8IiTgJeSbjcEOWdiVxcb9tEdtZ7eDwWQcwMsQdU9A9sCnargxl1IdVsbB9dfcFTQL8OpvjdqnmFZZJ6n2cKr51FonrcrMjm68aS4Lemk+D4sRaHnN+O5BrF10BiSfjumSkvhZ0Uwu/tR35LSmtC1UmVPgRNMwWkSHZjfjEdqueqhYglmB7nHQ8TDWCTb7lJLtTdhx1btg7UWsAuNIhffUpBo+T+3oh8sg8c41WaX5JaNL19UkD2M0qFd8Sayfr0qeGXnrLrKkS0t56ckjui2rTTmUDKFup4CnEtE7fu6nGYeGSoCwGoRlYQD/SU1/GSIWfs8hSpK3KeSZgUQXk14b7dh2LaqrVKGJLja/hFcQCt2gdGD+Ml+iH+Cy0lqj3D32RSarS3k4mJyTKsGnETyXVlCbJtC7kiZ/gZ7i8ChR2hL1qWb7ZInxaHN7WVbsLxZmEIp0Bf+we6YCbg0JrLMoTqXqfx7lb4bGgIRzD4Kz+U9pve9VS4eU4c7JKX6XVLqg56dRO7Kw8MVipjdSANC/f54eQJ+YfB3RYT4eih7PAmHp62d8GiCJABN36B6oiENrnHkBvFu9JPTwo6BStvfP+fZEKFoxaKO3f78thxD7GZdMp0PLwZagS3G6TDAdY1nwSqtQC0G/9GR+VUHkDi2Mz5yxc/r8tfic+7p22WjmOGSge8joCeO7y5NARFillrggokK5I9rjSYy/pnNrfHBbORUL1ZCBf4FrD4=
```

It could be done without itty.bitty.site:

```
data:text/html;charset=utf-8;base64,PHN0eWxlIHR5cGU9InRleHQvY3NzIj4KYm9keSB7bWFyZ2luOjR2bWluIGF1dG87IHdpZHRoOjc0dm1pbjsgYmFja2dyb3VuZDojZWVlOyBmb250LXNpemU6IDh2bWluOyBmb250LWZhbWlseTpzYW5zLXNlcmlmO30KaW5wdXQsIGRpdiB7IGhlaWdodDoyZW07ICBib3JkZXItcmFkaXVzOiAxZW07IGZvbnQtc2l6ZToxZW07fQppbnB1dCB7d2lkdGg6Ni44ZW07IHBhZGRpbmc6IDAgMWVtOyAgbWFyZ2luOjAgMC40ZW0gMC40ZW0gMDsgdGV4dC1hbGlnbjpyaWdodDsgYm9yZGVyOm5vbmU7fQpkaXYge3dpZHRoOjJlbTsgYmFja2dyb3VuZDojZmZmOyBib3JkZXI6bm9uZTsgbWFyZ2luOjAgMC40ZW0gMC40ZW0gMDsgZGlzcGxheTppbmxpbmUtYmxvY2s7IHRleHQtYWxpZ246Y2VudGVyOyBsaW5lLWhlaWdodDoyZW07fQpkaXY6YWN0aXZlIHtiYWNrZ3JvdW5kOnJlZDsgY29sb3I6d2hpdGU7fQpkaXY6bnRoLWNoaWxkKDVuICsgMikgeyBiYWNrZ3JvdW5kOiM0QTkwRTI7IGNvbG9yOndoaXRlOyBtYXJnaW4tcmlnaHQ6MDt9Cjwvc3R5bGU+CjxpbnB1dCB0eXBlPSJ0ZXh0Ij48ZGl2IG9uY2xpY2s9ImZpZWxkLnZhbHVlID0gJyciPkM8L2Rpdj48YnI+PGRpdj43PC9kaXY+PGRpdj44PC9kaXY+PGRpdj45PC9kaXY+PGRpdj7DtzwvZGl2Pjxicj48ZGl2PjQ8L2Rpdj48ZGl2PjU8L2Rpdj48ZGl2PjY8L2Rpdj48ZGl2PsOXPC9kaXY+PGJyPjxkaXY+MTwvZGl2PjxkaXY+MjwvZGl2PjxkaXY+MzwvZGl2PjxkaXY+LTwvZGl2Pjxicj48ZGl2Pi48L2Rpdj48ZGl2PjA8L2Rpdj48ZGl2IG9uY2xpY2s9ImZpZWxkLnZhbHVlID0gZXZhbChmaWVsZC52YWx1ZS5yZXBsYWNlKCfDtycsICcvJykucmVwbGFjZSgnw5cnLCAnKicpKSI+PTwvZGl2PjxkaXY+KzwvZGl2Pgo8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+CnZhciBmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7CmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpLmZvckVhY2goZnVuY3Rpb24oZGl2KSB7CiAgaWYgKCFkaXYub25jbGljaykgZGl2Lm9uY2xpY2sgPSBmdW5jdGlvbihkaXYpIHsgZmllbGQudmFsdWUgKz0gdGhpcy5pbm5lclRleHQ7IH0KfSk7Cjwvc2NyaXB0Pg==
```
