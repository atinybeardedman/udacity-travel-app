import { getUnits } from "../js/helpers";

beforeEach(() => {
    document.body.innerHTML = `
    <form>
        <div class="field">
            <label for="country" class="label">Country</label>
            <div class="control">
            <div class="select">
                <select
                disabled
                id="countrySelect"
                data-id="country"
                class="is-loading"
                >
                <option disabled
                    >Please Select A Country First</option
                >
                </select>
            </div>
            </div>
        </div>
        <div class="field">
            <label for="city" class="label">City</label>
            <div class="control">
            <input
                id="cityInput"
                placeholder="Loading Cities..."
                type="text"
                class="input"
                data-id="city"
                required
            />
            </div>
        </div>
        <div class="field">
            <label for="dateInput" class="label"
            >When are you leaving?</label
            >
            <div class="control">
            <input
                id="dateInput"
                type="date"
                class="input"
                data-id="date"
                required
            />
            </div>
        </div>
        <div class="field">
            <label for="lengthInput" class="label"
            >How many days?</label
            >
            <div class="control">
            <input
                required
                data-id="length"
                id="lengthInput"
                min="1"
                value="7"
                type="number"
                class="input"
            />
            </div>
        </div>
        <div class="field">
            <label class="label">Weather Units</label>
            <div class="control">
            <label class="radio">
                <input
                id="metric_radio"
                checked
                type="radio"
                name="units"
                />
                Celsius
            </label>
            <label class="radio">
                <input
                id="imperial_radio"
                type="radio"
                name="units"
                />
                Fahrenheit
            </label>
            </div>
        </div>
        <div class="class control">
            <button id="submit" disabled class="button is-primary">
            Submit
            </button>
        </div>
        </form>
    `;
})

test('getUnits should get value of selected radio button', () => {
    expect(getUnits()).toBe('M');
});