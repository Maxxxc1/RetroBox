<html>
<head>
  <script type="text/javascript" src="scripts/jquery-3.1.1.min.js" />
  <script type="text/javascript" src="scripts/handlebars-v4.0.5.js" />
</head>
<body>
<div id="content-placeholder"></div>

<script id="some-template" type="text/x-handlebars-template">
  <table>
    <thead>
      <th>Username</th>
      <th>Real Name</th>
      <th>Email</th>
    </thead>
    <tbody>
      {{#users}}
        <tr>
          <td>{{username}}</td>
          <td>{{firstName}} {{lastName}}</td>
          <td>{{email}}</td>
        </tr>
      {{/users}}
    </tbody>
  </table>
</script>

<script>
  var source   = $("#some-template").html();
  alert(source);
  var template = Handlebars.compile(source);
  var data = { users: [
      {username: "alan", firstName: "Alan", lastName: "Johnson",      email: "alan@test.com" },
      {username: "allison", firstName: "Allison", lastName: "House", email: "allison@test.com" },
      {username: "ryan", firstName: "Ryan", lastName: "Carson", email: "ryan@test.com" }
    ]};
  $("#content-placeholder").html(template(data));
</script>
</body>
</html>
