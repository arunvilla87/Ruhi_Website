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
    -- Insert admin user into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@ruhiinc.com',
      crypt('Admin@123', gen_salt('bf')),
      now(),
      jsonb_build_object('role', 'admin'),
      now(),
      now(),
      encode(gen_random_bytes(32), 'hex'),
      encode(gen_random_bytes(32), 'hex')
    )
    RETURNING id INTO admin_uid;

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