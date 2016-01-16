require 'jekyll'
require 'fileutils'
require 'shellwords.rb'

PROD_USER   = "83505"
PROD_SERVER = "git.dc2.gpaas.net"
PROD_HTDOCS = File.basename(FileUtils.pwd)

task :default => [:serve]

desc "Environment Setup"
task :setup do
  # ensure _site exists
  site_dir = File.join(File.dirname(__FILE__), '_site')
  unless Dir.exists?(site_dir)
    FileUtils.mkdir_p(site_dir)
    Dir.chdir(site_dir)
    system "git init ."
    system "git remote add origin git+ssh://#{PROD_USER}@#{PROD_SERVER}/#{PROD_HTDOCS}.git"
  else
    Dir.chdir(site_dir)
  end

  # catch up with the deployed master
  system "git pull origin master"
  Dir.chdir(File.join(File.dirname(__FILE__)))
end

desc "Merge the Assets Folder with This Folder"
task :prepare do
  my_dir = File.dirname(__FILE__)
  src_dir = File.join(File.dirname(__FILE__), '..', 'eris-assets')

  Dir.chdir(my_dir)

  unless Dir.exists?(src_dir)
    print "eris-assets does not exist.\nI am pulling it in."
    system "git clone git@github.com:eris-ltd/eris-assets ../eris-assets"
  end

  # Copy in the assets
  src_files = Dir.glob(File.join(src_dir, '*'))
  FileUtils.cp_r src_files, my_dir, verbose: true

  # Merge the config files
  config_file = File.join(my_dir, '_config.yml')
  config_default = File.read(config_file)
  config_this = File.read(File.join(my_dir, '_config_this.yml'))
  config = config_default + "\n\n" + config_this
  File.open(config_file, 'w'){|f| f.write(config)}
end

desc "Get ready and Serve"
task :serve => [:prepare] do
  system "bundle exec jekyll serve"
end

desc "Clean out the Assets"
task :clean do
  my_dir = File.dirname(__FILE__)
  Dir.chdir(my_dir)

  src_dir = File.join(File.dirname(__FILE__), '..', 'eris-assets')
  src_files = Dir.glob(File.join(src_dir, '*'))

  # Remove the Files
  src_files.each do |f|
    FileUtils.rm_rf(File.join(my_dir, File.basename(f)))
  end

  # Remove the generated Files
  generated = [File.join(my_dir, '.sass-cache'), File.join(my_dir, '_site')]
  generated.each do |f|
    FileUtils.rm_rf(f)
  end

  # Reset the circle.yml file
  system "git checkout -- ./circle.yml"
end

desc "CircleCI Deploy only this site"
task :deploy do
  Dir.chdir(File.dirname(__FILE__))
  print "Committing Built Site.\n"
  Dir.chdir "_site"
  system "git add -A ."
  message = "Site updated at #{Time.now.utc}"
  system "git commit -m #{message.shellescape}"
  print "Pushing to Production.\n"
  system "git push origin master"
  print "Deploying Site.\n"
  system "ssh #{PROD_USER}@#{PROD_SERVER} 'deploy #{PROD_HTDOCS}.git master'"
end