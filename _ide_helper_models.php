<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\User
 *
 * @property int $id
 * @property string $name
 * @property string|null $last_name
 * @property string|null $phone
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\UserAddress[] $address
 * @property-read int|null $address_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read int|null $clients_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\UserEducation[] $education
 * @property-read int|null $education_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\UserPosition[] $positions
 * @property-read int|null $positions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @property-read int|null $tokens_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Position[] $user_position
 * @property-read int|null $user_position_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace App{
/**
 * App\AddressType
 *
 * @property int $id
 * @property string $name
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AddressType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AddressType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AddressType query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AddressType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AddressType whereName($value)
 */
	class AddressType extends \Eloquent {}
}

namespace App{
/**
 * App\UserPosition
 *
 * @property int $id
 * @property int $user_id
 * @property int $position_id
 * @property-read \App\Position $name
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserPosition newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserPosition newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserPosition query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserPosition whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserPosition wherePositionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserPosition whereUserId($value)
 */
	class UserPosition extends \Eloquent {}
}

namespace App{
/**
 * App\UserAddress
 *
 * @property int $id
 * @property int $user_id
 * @property string $street
 * @property string $house_number
 * @property string|null $apartment_number
 * @property string $zip_code
 * @property string $city
 * @property string $voivodeship
 * @property int $address_type_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereAddressTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereApartmentNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereHouseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereVoivodeship($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserAddress whereZipCode($value)
 */
	class UserAddress extends \Eloquent {}
}

namespace App{
/**
 * App\Position
 *
 * @property int $id
 * @property string $name
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Position newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Position newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Position query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Position whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Position whereName($value)
 */
	class Position extends \Eloquent {}
}

namespace App{
/**
 * App\UserEducation
 *
 * @property int $id
 * @property int $user_id
 * @property string $university
 * @property string $field_of_study
 * @property string $year_of_graduation
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation whereFieldOfStudy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation whereUniversity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserEducation whereYearOfGraduation($value)
 */
	class UserEducation extends \Eloquent {}
}

