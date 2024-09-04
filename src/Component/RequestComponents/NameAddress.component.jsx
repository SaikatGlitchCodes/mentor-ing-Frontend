import { Field, ErrorMessage, useFormikContext } from 'formik';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import React, { useEffect, useRef } from 'react';

export default function NameAddress() {
    const autocompleteRef = useRef(null);
    const {setFieldValue} = useFormikContext()
    useEffect(() => {
        if (autocompleteRef.current) return; // Skip if already initialized

        const autocompleteElement = document.getElementById("autocomplete");
        if (!autocompleteElement) return; // Skip if element doesn't exist

        const autocomplete = new GeocoderAutocomplete(
            autocompleteElement, 
            'bf54fd88359a45f192b5dd4008c1ccca', 
            { /* Geocoder options */ }
        );

        autocomplete.on('select', (location) => {
            // console.log('[location]', location);
            const loc_properties = location.properties;
            setFieldValue('address', loc_properties.formatted)
            setFieldValue('complete_address', {
                addressline_1: loc_properties.address_line1,
                addressline_2: loc_properties.address_line2,
                country: loc_properties.country,
                country_code: loc_properties.country_code,
                street: loc_properties.street,
                city: loc_properties.city,
                state: loc_properties.state,
                state_code: loc_properties.state_code,
                zip: loc_properties.postcode,
                abbreviation_STD:loc_properties.timezone.abbreviation_STD,
                offset_STD: loc_properties.timezone.offset_STD,
                lat: loc_properties.lat,
                lon: loc_properties.lon,
            })
        });
        
        // autocomplete.on('suggestions', (suggestions) => {
        //     console.log('[Suggestions]', suggestions);
        // });

        autocompleteRef.current = autocomplete; // Store the instance
    }, []);

    return (
        <div className="grid grid-cols-1 mt-4 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <ErrorMessage name="name" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="col-span-full">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                </label>
                <div className="mt-2">
                    <div id="autocomplete" className="relative autocomplete-container"></div>
                </div>
                <ErrorMessage name="address" component="span" className="mt-1 text-sm text-red-500" />
            </div>
        </div>
    );
}