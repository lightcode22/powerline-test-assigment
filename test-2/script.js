let garageDetails;

const showItemInfo = (item) => {
	html = `

    <div class='item-title'>${item.Title}</div>
    <div class='item-description'>${item.Description}</div>
    <div class="subblock">
        <span class='subblock-title'>Basics</span>
        <ul>
            <li>
            Make: <span class="details">${item.Original.Make}</span>
            </li>
            <li>
            Model: <span class="details">${item.Original.Model}</span>
            </li>
            <li>
            Color: <span class="details">${item.Original.CarOptions.Title} (${item.Original.CarOptions.Code})</span>
            </li>
        </ul>
    </div>
    <div class="subblock">
        <span class='subblock-title'>Features</span>
        <ul>
            <li>
            Fuel type: <span class="details">${item.KeyValues.FuelType}</span>
            </li>
            <li>
            Gear box: <span class="details">${item.KeyValues.GearBox}</span>
            </li>
            <li>
            Trim level: <span class="details">${item.KeyValues.TrimLevel}</span>
            </li>
        </ul>
    </div>`;

	document.querySelector(".item-block").innerHTML = html;
};

const showForm = () => {
	const html = `
            <form action='/'>
             <label for="owner">Owner:</label>
              <input name='owner' value="${garageDetails.Owner}" />
               
           
            <label for="name">Name:</label>
              <input name='name' value="${garageDetails.Name}" />
               
            
                <label for="email">Owner:</label>
              <input name='email' value="${garageDetails.Email}" />
               
          
              <button type='submit'>Save changes</button>
            </form>`;

	document.querySelector(".garage-block").innerHTML = html;
	document.querySelector("form").addEventListener("submit", (e) => {
		e.preventDefault();

		const owner = document.querySelector('input[name="owner"]').value;
		const name = document.querySelector('input[name="name"]').value;
		const email = document.querySelector('input[name="email"]').value;

		if (owner && owner !== garageDetails.Owner) {
			garageDetails.Owner = owner;
		}

		if (name && name !== garageDetails.Name) {
			garageDetails.Name = name;
		}

		if (email && email !== garageDetails.Email) {
			garageDetails.Email = email;
		}

		showGarageInfo();
	});
};

const showGarageInfo = () => {
	const html = `
              <div class='garage-info'>
                <ul>
                  <li>Owner: <span class='garage-details'>${garageDetails.Owner}</span></li>
                  <li>Name: <span class='garage-details'>${garageDetails.Name}</span></li>
                  <li>Email: <span class='garage-details'>${garageDetails.Email}</span></li>
                </ul>
                <button type='button'>Edit</button>
              </div>
              `;
	document.querySelector(".garage-block").innerHTML = html;
	document.querySelector("button").addEventListener("click", () => {
		showForm();
	});
};

const showError = () => {
	document.querySelector("#main").innerHTML =
		"<div class='error-message'>something went wrong</div>";
};

document.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch("http://109.236.74.74:9900/getdata");

	if (response.ok) {
		const data = await response.json();

		garageDetails = { ...data.Garage };

		document.querySelector("#main").innerHTML =
			"<div class='item-block'></div><div class='garage-block'></div>";

		showItemInfo(data.Item);
		showGarageInfo();
	} else {
		showError();
	}
});
