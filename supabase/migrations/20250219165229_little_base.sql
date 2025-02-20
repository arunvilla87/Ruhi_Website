-- Create admin user if it doesn't exist
DO $$
DECLARE
  admin_uid uuid;
BEGIN
  -- First check if the admin user already exists
  SELECT id INTO admin_uid
  FROM auth.users
  WHERE email = 'admin@ruhiinc.com';

  -- If admin user doesn't exist, create it
  IF admin_uid IS NULL THEN
    -- Generate a UUID for the admin user
    admin_uid := gen_random_uuid();
    
    -- Insert admin user into auth.users with proper authentication setup
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at,
      last_sign_in_at,
      confirmation_token,
      email_change_token_current,
      email_change_token_new,
      recovery_token,
      is_super_admin,
      phone,
      phone_confirmed_at,
      confirmed_at,
      email_change_token_current_expires_at,
      email_change_token_new_expires_at,
      recovery_token_expires_at,
      reauthentication_token,
      reauthentication_token_expires_at,
      is_sso_user,
      deleted_at,
      invited_at,
      confirmation_sent_at,
      confirm_password_attempts,
      recovery_sent_at,
      email_change_confirm_status,
      banned_until,
      raw_app_meta_data
    )
    VALUES (
      admin_uid,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'admin@ruhiinc.com',
      crypt('Admin@123', gen_salt('bf')),
      now(),
      jsonb_build_object('role', 'admin'),
      now(),
      now(),
      now(),
      encode(gen_random_bytes(32), 'hex'),
      encode(gen_random_bytes(32), 'hex'),
      encode(gen_random_bytes(32), 'hex'),
      encode(gen_random_bytes(32), 'hex'),
      false,
      null,
      null,
      now(),
      now() + interval '1 day',
      now() + interval '1 day',
      now() + interval '1 day',
      encode(gen_random_bytes(32), 'hex'),
      now() + interval '1 day',
      false,
      null,
      null,
      null,
      0,
      null,
      0,
      null,
      '{}'::jsonb
    );

    -- Create identities record for the admin user
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    )
    VALUES (
      admin_uid,
      admin_uid,
      jsonb_build_object(
        'sub', admin_uid::text,
        'email', 'admin@ruhiinc.com',
        'email_verified', true,
        'phone_verified', false,
        'aud', 'authenticated',
        'role', 'authenticated'
      ),
      'email',
      now(),
      now(),
      now()
    );

    -- Create admin profile
    INSERT INTO public.profiles (id, email, role)
    VALUES (admin_uid, 'admin@ruhiinc.com', 'admin');
  ELSE
    -- Update existing admin profile to ensure role is set
    UPDATE public.profiles
    SET role = 'admin'
    WHERE id = admin_uid;
  END IF;
END $$;